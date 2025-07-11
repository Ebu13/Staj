using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Business.Repositories.Interfaces
{
   
        public interface IHaberlerRepository
        {
            Task<IEnumerable<Haberler>> GetAllAsync();
            Task<Haberler> GetByIdAsync(int id);
            Task AddAsync(Haberler haber);
            Task UpdateAsync(Haberler haber);
            Task DeleteAsync(int id);
        }


}
