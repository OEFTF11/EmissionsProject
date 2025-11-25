import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

import { BaseChartDirective } from 'ng2-charts';

import {
  Chart,
  registerables,
  ChartConfiguration,
  ChartOptions
} from 'chart.js';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Register all the built-in Chart.js components (includes 'linear' scale)
Chart.register(...registerables);

export interface EmissionRecord {
  facility: string;
  sourceType: string;
  co2TonsPerYear: number;
  year: number;
}

@Component({
  selector: 'app-emissions-list',
  standalone: true,
  imports: [
    BaseChartDirective,
    NgFor,
    NgIf,
    NgClass,
    FormsModule,
    DecimalPipe
  ],
  templateUrl: './emissions-list.html',
  styleUrls: ['./emissions-list.css']
})
export class EmissionsList implements OnInit {

  @ViewChild('chartContainer') chartContainer!: ElementRef<HTMLDivElement>;

  records: EmissionRecord[] = [
    { facility: 'Olympia Public Works Department', sourceType: 'Transportation', co2TonsPerYear: 1180, year: 2024 },
    { facility: 'Lacey Maintenance & Operations Center', sourceType: 'Transportation', co2TonsPerYear: 960,  year: 2024 },
    { facility: 'Olympia City Hall',               sourceType: 'Transportation', co2TonsPerYear: 410,  year: 2024 },
    { facility: 'Regional Athletic Complex',       sourceType: 'Transportation', co2TonsPerYear: 260,  year: 2024 },

    { facility: 'Olympia Public Works Department', sourceType: 'Electricity',    co2TonsPerYear: 520,  year: 2024 },
    { facility: 'Olympia City Hall',               sourceType: 'Boilers',        co2TonsPerYear: 275,  year: 2024 }
  ];

  filteredFacilities: EmissionRecord[] = [];

  selectedSource: string = 'All';

  facilityCount = 0;
  totalCo2 = 0;

  selectedFacility: string | null = null;

  kpiCards: { facility: string; totalCo2: number }[] = [];
  topEmitters: { facility: string; totalCo2: number }[] = [];

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'CO₂ (tons/year)',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  };

  ngOnInit(): void {
    this.applyFilter();
  }

  onSourceChange(value: string): void {
    this.selectedSource = value;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.selectedSource === 'All') {
      this.filteredFacilities = [...this.records];
    } else {
      this.filteredFacilities = this.records.filter(
        r => r.sourceType === this.selectedSource
      );
    }

    // when source changes, clear any current facility selection
    this.selectedFacility = null;

    this.facilityCount = this.filteredFacilities.length;
    this.totalCo2 = this.filteredFacilities.reduce(
      (sum, r) => sum + r.co2TonsPerYear,
      0
    );

    this.buildCards();
    this.buildChart();
  }

  buildCards(): void {
    const groups: { [key: string]: number } = {};

    for (const r of this.filteredFacilities) {
      groups[r.facility] = (groups[r.facility] || 0) + r.co2TonsPerYear;
    }

    this.kpiCards = Object.keys(groups).map(name => ({
      facility: name,
      totalCo2: groups[name]
    }));

    this.updateTopEmitters();
  }

  private updateTopEmitters(): void {
    this.topEmitters = [...this.kpiCards]
      .sort((a, b) => b.totalCo2 - a.totalCo2)
      .slice(0, 3);
  }

  selectFacility(card: { facility: string }): void {
    this.selectedFacility = card.facility;
    this.buildChart(); // update chart to reflect selected facility
  }

  buildChart(): void {
    // If a facility is selected, only show that facility’s data
    const source = this.selectedFacility
      ? this.filteredFacilities.filter(r => r.facility === this.selectedFacility)
      : this.filteredFacilities;

    const labels = source.map(r => r.facility);
    const values = source.map(r => r.co2TonsPerYear);

    this.barChartData = {
      labels,
      datasets: [
        {
          label: 'CO₂ (tons/year)',
          data: values,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };
  }

  // ===== EXPORTS =====

  exportChartAsPdf(): void {
    if (!this.chartContainer) {
      return;
    }

    const element = this.chartContainer.nativeElement;

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'pt', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const marginTop = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'PNG', 0, marginTop, imgWidth, imgHeight);
      pdf.save('emissions-chart.pdf');
    });
  }

  exportDataAsJson(): void {
    const data = this.filteredFacilities;
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'emissions-data.json';
    a.click();

    URL.revokeObjectURL(url);
  }

  exportDataAsCsv(): void {
    const csvContent = this.buildCsvContent(this.filteredFacilities);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'emissions-data.csv';
    a.click();

    URL.revokeObjectURL(url);
  }

  private buildCsvContent(records: EmissionRecord[]): string {
    const header = 'Facility,Source Type,CO2 (tons/year),Year';
    const rows = records.map(
      r =>
        `"${r.facility.replace(/"/g, '""')}",` +
        `"${r.sourceType}",` +
        `${r.co2TonsPerYear},` +
        `${r.year}`
    );
    return [header, ...rows].join('\r\n');
  }
}
