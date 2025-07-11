namespace Backend.Business.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using global::Backend.Business.Repositories.Interfaces;
    using global::Backend.Business.Services.Interfaces;
    using global::Backend.Models;

        public class HaberlerService : IHaberlerService
        {
            private readonly IHaberlerRepository _haberlerRepository;

            public HaberlerService(IHaberlerRepository haberlerRepository)
            {
                _haberlerRepository = haberlerRepository;
            }

            public Task<IEnumerable<Haberler>> GetAllAsync()
            {
                return _haberlerRepository.GetAllAsync();
            }

            public Task<Haberler> GetByIdAsync(int id)
            {
                return _haberlerRepository.GetByIdAsync(id);
            }

            public Task AddAsync(Haberler haber)
            {
                return _haberlerRepository.AddAsync(haber);
            }

            public Task UpdateAsync(Haberler haber)
            {
                return _haberlerRepository.UpdateAsync(haber);
            }

            public Task DeleteAsync(int id)
            {
                return _haberlerRepository.DeleteAsync(id);
            }
        }
    }

