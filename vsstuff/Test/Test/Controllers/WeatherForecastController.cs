using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Test.Migrations;

namespace Test.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly TestDBcontext _dbcontext;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, TestDBcontext context)
        {
            _logger = logger;
            _dbcontext = context;
        }

        [HttpGet("getImages")]
        public List<Image> getImages()
        {

            return _dbcontext.Images.ToList();
        }

        [HttpGet("getImage")]
        public async Task<IActionResult> getImage(int id)
        {
            var image = await _dbcontext.Images.FirstOrDefaultAsync(t => t.ID == id);
            var memory = new MemoryStream();
            string contentType;
            new FileExtensionContentTypeProvider().TryGetContentType(image.filePath, out contentType);
            using (var stream = new FileStream(image.filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, contentType, Path.GetFileName(image.filePath));
        }
        [HttpPost("getFiles")]
        public async Task<ActionResult> getFile(IFormFile file)
        {

            var filename = file.FileName;
            var extention = $".{file.ContentType.Split('/')[1]}";
            var path = $"./{filename}{extention}";
            using (Stream fileStream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            var newImage = new Image()
            {
                filePath = path
            };
            await _dbcontext.Images.AddAsync(newImage);
            _dbcontext.SaveChanges();
            return Ok(file);
        }

    }
}