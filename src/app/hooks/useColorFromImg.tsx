import { useEffect, useState } from "react";









export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => {
      resolve(img);
    });
    img.addEventListener("error", reject);
    img.src = src;
    img.setAttribute("crossOrigin", "");
  });
};

export const analyzeImage = (img: HTMLImageElement) => {
  const { width, height } = img;
 
  const canvas = document.createElement("canvas");
  canvas.height = height;
  canvas.width = width;
  const context = canvas.getContext?.("2d");
  if (context === null) {
    return;
  }
  context.drawImage(img, 0, 0);
  const imageData = context.getImageData(0, 0, width, height);
 

  
  const index = 10600;
  let r = imageData.data[index];
  let g = imageData.data[index + 1];
  let b = imageData.data[index + 2];
  
   return `rgba(${r},${g},${b},0.50)`;
}





export const useColorFromImg = (link:string | undefined) => { 

  const [color, setColor] = useState<string | undefined>("");
  useEffect(() => {
    link && loadImage(link).then((img) => {
      setColor(analyzeImage(img));
    });
  }, [link]);
  return color
}