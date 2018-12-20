using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Net.Http;
using Microsoft.Extensions.PlatformAbstractions;
using Microsoft.AspNetCore.Mvc;

namespace ZmHelperApi.Model
{
    public class DrawImg
    {
        public string mbImg = "";
        public List<TianChong> tianchong;
        public async Task<Stream> Draw()
        {
            HttpClient httpClient = new HttpClient();
            Stream oldstm = await httpClient.GetStreamAsync(mbImg);
            Image img_old = new Bitmap(oldstm);
            MemoryStream stm = new MemoryStream();
            img_old.Save(stm, ImageFormat.Png);
           
            return stm;
        }
    }
    public class TianChong
    {
        public float x = 0;
        public float y = 0;
        public float h = 0;
        public float w = 0;
        public string neirong = "";
        public DrawImgNeirongType neirongtype = DrawImgNeirongType.text;
    }
    public enum DrawImgNeirongType
    {
        text,
        img,
        erweima
    }
}
