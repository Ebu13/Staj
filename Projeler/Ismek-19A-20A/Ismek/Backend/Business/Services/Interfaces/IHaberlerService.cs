namespace Backend.Business.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Backend.Models;

        public interface IHaberlerService
        {
            Task<IEnumerable<Haberler>> GetAllAsync();
            Task<Haberler> GetByIdAsync(int id);
            Task AddAsync(Haberler haber);
            Task UpdateAsync(Haberler haber);
            Task DeleteAsync(int id);
        }

}
