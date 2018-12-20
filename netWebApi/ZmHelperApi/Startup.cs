using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.PlatformAbstractions;
using Swashbuckle.AspNetCore.Swagger;

namespace ZmHelperApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // 此方法由运行时调用。使用此方法向容器添加服务。
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            //配置Swagger
            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("V1.0", new Info
            //    {
            //        Title = "猛哥的 testAPI",
            //        Version = "V1.0",
            //        Description = "这里放一些描述性的内容",
            //        TermsOfService = "终端服务是啥",
            //        Contact = new Contact
            //        {
            //            Name = "最帅的大猛哥",
            //            Email = "496472571@qq.com"
            //        }
            //    });
            //    var filePath = Path.Combine(PlatformServices.Default.Application.ApplicationBasePath, "ZmHelperApi.xml");
            //    //c.IncludeXmlComments(filePath);
            //    c.CustomSchemaIds((type) => type.FullName);
            //});
            #region 跨域
            services.AddCors(options =>
            options.AddPolicy("AllowSameDomain",
        builder => builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin().AllowCredentials())
);
            #endregion
        }

        // 此方法由运行时调用。使用此方法配置HTTP请求管道。
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            // 跨域
            app.UseCors("AllowSameDomain");
            //app.UseSwagger();
            //app.UseSwaggerUI(c =>
            //{
            //    c.SwaggerEndpoint("swagger/v1/swagger.json", "ZmHelperApi");
            //});
            app.UseMvc();
        }
    }
}
