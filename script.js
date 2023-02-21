const url = "https://dog.ceo/api/breeds/image/random";
//const url = "https://picsum.photos/500/400";

const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const canvas2 = document.getElementById('canvas2');
    const ctx2 = canvas2.getContext('2d');

    var img = new Image();
    img.crossOrigin = "Anonymous";
    
    async function asincFetch(){

        document.getElementById("af").innerHTML = "";
    
    const response =  await fetch(url)

    const data = await response.json();
    
        display_image(data);
        img.src = "https://api.codetabs.com/v1/proxy?quest=" + data.message;
        setTimeout(async function display_image_after_canvas()
    {
    
    ctx.save();
    ctx.drawImage(img,0,0,500,400);
    ctx.restore(); 
    var prelucreazaImagine = ctx.getImageData(0,0,canvas.width,canvas.height);
    var valoriPixeli = prelucreazaImagine.data;


    for(i = 0; i < canvas.height; i ++)
    {
       for(j = 0; j < canvas.width/2; j ++)
           {
               for(k = 0; k <= 3; k++)
                   {
                       var swap = valoriPixeli[i * 4 * canvas.width + j * 4 + k];
                       valoriPixeli[i * 4 * canvas.width + j * 4 + k] = valoriPixeli[i * 4 * canvas.width + 4 * (canvas.width-j) + k];
                       valoriPixeli[i * 4 * canvas.width + 4 * (canvas.width-j) + k] = swap;
                   }
           }
               

       } 
    ctx.putImageData(prelucreazaImagine,0,0);
    
    ctx2.save();
    ctx2.drawImage(img,0,0,500,400);
    ctx2.restore();
    var prelucreazaImagine = ctx2.getImageData(0,0,canvas.width,canvas.height);
    var valoriPixeli = prelucreazaImagine.data;


     for(i = 0; i < canvas.height; i ++)
     {
        for(j = 0; j < canvas.width/2; j ++)
            {
                for(k = 0; k <= 3; k++)
                    {
                        var swap = valoriPixeli[i * 4 * canvas.width + j * 4 + k];
                        valoriPixeli[i * 4 * canvas.width + j * 4 + k] = valoriPixeli[i * 4 * canvas.width + 4 * (canvas.width-j) + k];
                        valoriPixeli[i * 4 * canvas.width + 4 * (canvas.width-j) + k] = swap;
                    }
            }
                

        } 
    ctx2.putImageData(prelucreazaImagine,0,0); 

    },5000); 
    }
    
function display_image(data)
{
    document.getElementById("image").src = data.message;
     console.log(data);

} 

function data_message(data)
{
    return data.message;
} 



function apllyBrightness()
{
    var data1 = new Date();
    var timp1 = Date.now();

    ctx2.drawImage(img,0,0,500,400);
    const prelucreazaImagine = ctx.getImageData(0,0,canvas.width,canvas.height);
    const data = prelucreazaImagine.data;
    var BrightnessFactor = document.getElementById("luminozitate").value;
    console.log(BrightnessFactor);


    for(i = 0; i < data.length; i += 4)
       {

        data[i] = modifyColor(data[i],BrightnessFactor);
        data[i+1] = modifyColor(data[i+1],BrightnessFactor);
        data[i+2] = modifyColor(data[i+2],BrightnessFactor);

       }
    ctx2.putImageData(prelucreazaImagine,0,0);

    console.log(Date.now() - timp1+"ms");
}


function modifyColor(color, BrightnessFactor)
{

    var valoareRecalculata = parseFloat(color*(1+parseFloat(BrightnessFactor)));
    if(valoareRecalculata > 255) return 255;

    if(valoareRecalculata < 0) return 0;

    return Math.round(valoareRecalculata);
}

const val = document.getElementById("luminozitate");
document.getElementById("af").innerHTML = val.value;

    val.oninput =  function act()
{
    document.getElementById("af").innerHTML = val.value;
}