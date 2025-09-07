# Entity Framework Core Scaffold Kullanımı

Bu proje, **Entity Framework Core** kullanılarak mevcut bir veritabanından `DbContext` ve entity modellerini üretmek için hazırlanmıştır.  
Aşağıdaki komut ile `Bekommerce` veritabanına bağlanılıp gerekli sınıflar otomatik olarak oluşturulur.

---

## Kullanılan Scaffold Komutu

```bash
dotnet ef dbcontext scaffold "Server=EBUBEKIR13;Database=Bekommerce;Trusted_Connection=True;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer --output-dir Models --context-dir Data --context BekommerceContext --force
