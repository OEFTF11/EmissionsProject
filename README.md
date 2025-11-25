EmissionsDashboard
A full-stack emissions reporting dashboard built with Angular (frontend) and ASP.NET Core Web API (backend).
The project demonstrates real-world application architecture, API integration, UI filtering, and modular component design — aligned with requirements for professional software engineering roles.

📌 Technologies Used
Frontend – Angular
Angular 17+
TypeScript
HTML / CSS
Angular Router
Angular Components & Services
HttpClient for API calls

Backend – .NET 8 Web API
ASP.NET Core
Controllers, Models, Dependency Injection
C#
REST API architecture
Local development server

🚀 How to Run the Project
1. Start the Backend
cd EmissionsBackend/Emissions.Api
dotnet run
http://localhost:5067/swagger/index.html

2. Start the Frontend
cd EmissionsFrontend
ng serve --open
http://localhost:4200/

🏗️ Project Structure
Angular Frontend
/src
  /app
    /emissions-list
      emissions-list.ts
      emissions-list.html
      emissions-list.css
    app.routes.ts
    app.config.ts
/Controllers
/Models
Program.cs
appsettings.json

📊 Application Screenshots
Dashboard – Main View

Shows total facility emissions aggregated in a formatted list.

Dashboard – Continued View

Scrollable list & extended UI section.

Facility Filter

User can filter emissions data per facility.

Backend Running

ASP.NET API running successfully.

Frontend + Backend Working Together

Both services running with connected API calls.

![Both Running](Screenshots/frontend + backend running.png)

📚 Features Implemented

Angular component-driven UI

REST API consumption using HttpClient

Clean project structure following Angular best practices

ASP.NET Core Web API delivering emission data

CSS-styled emissions dashboard

Local environment configured with matching Olympia, WA areas (for realism)

🧪 Testing

Angular testing:

ng test

📌 Summary

This full-stack application demonstrates:

Experience with Angular, HTML, CSS

Backend development with ASP.NET Core (.NET 8)

REST API design & integration

Practical full-stack project architecture

Realistic municipal use-case (City of Olympia emissions)

📎 Contact

If you have questions or need more details about the implementation, feel free to reach out.

Why This Project Matches the Ecology Job Requirements

Job Requirement → Demonstrated in this project

Requirement    Demonstrated
Front-end development with HTML, CSS, Angular    ✔ Angular 17 app using components, services, templates, custom CSS
Back-end development using .NET Core / ASP.NET  ✔ Web API in .NET 8 with routing, models, controllers
REST API experience                             ✔ Front-end calls /emissions endpoint
Database knowledge (mocked)                     ✔ Data modeled like SQL rows and returned as structured JSON
Version control (Git/GitHub)                    ✔ Full repository with commit history
Moderate-risk application design                ✔ Clean architecture, typed models, stable JSON contracts
Ability to integrate front-end and API          ✔ Full stack integration demonstrated end-to-end

Future Enhancements

If expanded, the next steps would be:

Replace mock data with a SQL Server database

Add user authentication & role permissions

Add data export from the API

Implement filtering on the API instead of the client

Add map visualization using ArcGIS or Leaflet

Author

Jesse McClure
Full-stack software engineering student, Graduate with a BS in Computer Science on December, 12th 2025.
Email: jesse.mcclure@aol.com; jmc1252@wgu.edu
GitHub: https://github.com/OEFTF11
