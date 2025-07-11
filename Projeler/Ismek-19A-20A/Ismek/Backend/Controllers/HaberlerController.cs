using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Business.Services;
using Backend.Business.Services.Interfaces;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HaberlerController : ControllerBase
    {
        private readonly IHaberlerService _haberlerService;

        public HaberlerController(IHaberlerService haberlerService)
        {
            _haberlerService = haberlerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var haberler = await _haberlerService.GetAllAsync();
            return Ok(haberler);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var haber = await _haberlerService.GetByIdAsync(id);
            if (haber == null)
            {
                return NotFound();
            }
            return Ok(haber);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Haberler haber)
        {
            if (haber == null)
            {
                return BadRequest();
            }

            await _haberlerService.AddAsync(haber);
            return CreatedAtAction(nameof(GetById), new { id = haber.HaberId }, haber);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Haberler haber)
        {
            if (id != haber.HaberId)
            {
                return BadRequest();
            }

            var existingHaber = await _haberlerService.GetByIdAsync(id);
            if (existingHaber == null)
            {
                return NotFound();
            }

            await _haberlerService.UpdateAsync(haber);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var haber = await _haberlerService.GetByIdAsync(id);
            if (haber == null)
            {
                return NotFound();
            }

            await _haberlerService.DeleteAsync(id);
            return NoContent();
        }
    }
}
