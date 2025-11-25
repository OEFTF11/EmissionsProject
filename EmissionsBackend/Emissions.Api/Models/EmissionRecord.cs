namespace Emissions.Api.Models;

public class EmissionRecord
{
    public int Id { get; set; }

    public string Facility { get; set; } = string.Empty;

    public string SourceType { get; set; } = string.Empty;

    public double Co2TonsPerYear { get; set; }

    public int Year { get; set; }
}
