using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.PlatformAbstractions;
using Newtonsoft.Json.Linq;
using ZmHelperApi.Model;

namespace ZmHelperApi.Controllers
{
    [EnableCors("AllowSameDomain")]
    [Route("ZmHelperApi/[controller]")]
    public class DrawImgController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Object Get(string id)
        {
            return new  {
                x="3",
                y = new {
                    z="6666"
                }
            };
        }
        [HttpGet("testload")]
        public async Task<FileStreamResult> GetTest()
        {
            var newvalue = new DrawImg()
            {
                mbImg= "http://api.yunkucun.top/ZmEngineSuCai/EHSKCVLrGPWFv8k3Bd1No8aV.png"
            };
            
           var ms=await newvalue.Draw();
            //return file;
            //var filePath = Path.Combine(PlatformServices.Default.Application.ApplicationBasePath, "ZmHelperApi.xml");
            //FileStream ms = new FileStream(filePath, FileMode.Open);
            ms.Position = 0;
            return File(ms, "application/octet-stream","testImg.png");
        }

        // POST api/values
        [HttpPost]
        public object Post([FromBody]JObject value)
        {
            return value;
        }
        [HttpPost("test")]
        public async Task<FileStreamResult> PostTest([FromBody]JObject value)
        {
            var newvalue = value.ToObject<DrawImg>();
            var ms = await newvalue.Draw();
            ms.Position = 0;
            return File(ms, "application/octet-stream", "testImg.png");
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
