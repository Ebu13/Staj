using Backend.Business.Repositories.Interfaces;
using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Business.Repositories
{


    public class HaberlerRepository : IHaberlerRepository
    {
        private readonly IsmekContext _context;

        public HaberlerRepository(IsmekContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Haberler>> GetAllAsync()
        {
            return await _context.Haberlers.ToListAsync();
        }

        public async Task<Haberler> GetByIdAsync(int id)
        {
            var haber = await _context.Haberlers.FindAsync(id);
            if (haber == null)
            {
                throw new InvalidOperationException($"Haber with ID {id} was not found.");
            }
            return haber;
        }


        public async Task AddAsync(Haberler haber)
        {
            await _context.Haberlers.AddAsync(haber);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Haberler haber)
        {
            _context.Haberlers.Update(haber);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var haber = await _context.Haberlers.FindAsync(id);
            if (haber != null)
            {
                _context.Haberlers.Remove(haber);
                await _context.SaveChangesAsync();
            }
        }
    }
}