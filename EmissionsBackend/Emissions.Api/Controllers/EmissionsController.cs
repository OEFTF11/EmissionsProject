using Microsoft.AspNetCore.Mvc;
using Emissions.Api.Models;

namespace Emissions.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmissionsController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<EmissionRecord>> Get()
    {
        var records = new List<EmissionRecord>
        {
            new EmissionRecord
            {
                Id = 1,
                Facility = "Olympia City Hall",
                SourceType = "Electricity",
                Co2TonsPerYear = 410,
                Year = 2024
            },
            new EmissionRecord
            {
                Id = 2,
                Facility = "Lacey Maintenance & Operations Center",
                SourceType = "Transportation",
                Co2TonsPerYear = 960,
                Year = 2024
            },
            new EmissionRecord
            {
                Id = 3,
                Facility = "Olympia Public Works Department",
                SourceType = "Boilers",
                Co2TonsPerYear = 1180,
                Year = 2024
            },
            new EmissionRecord
            {
                Id = 4,
                Facility = "Regional Athletic Complex",
                SourceType = "Electricity",
                Co2TonsPerYear = 260,
                Year = 2024
            }
        };

        return Ok(records);
    }
}

