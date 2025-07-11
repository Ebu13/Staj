namespace Backend.Models.DTOs
{
    public class EgitimProgramlariDTO
    {
        public short EgitimProgramiId { get; set; }

        public string EgitimProgramiIsmi { get; set; } = null!;

        public short EgitimAlaniId { get; set; }
    }
}
