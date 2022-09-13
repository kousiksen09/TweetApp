import { BlobServiceClient } from "@azure/storage-blob";
//import { sasToken } from "../ImagePath";

export async function uploadfIle(Imagefile, ImagefileName) {
    console.log(ImagefileName);
    const blobService = new BlobServiceClient(
      "https://tweetappimages.blob.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2022-09-30T03:21:54Z&st=2022-09-12T19:21:54Z&spr=https,http&sig=sQnoqSZYkA9fn1DoVKODAZNwdX2p4Mt5afVT5EIdi1E%3D"
    );
    const containerClient = blobService.getContainerClient("tweetappimages");
    await containerClient.createIfNotExists({
      access: "container",
    });
    // await createBlobInContainer(containerClient, Imagefile);
    const blobClient = containerClient.getBlockBlobClient(ImagefileName);

    const options = {
      blobHTTPHeaders: { blobContentType: Imagefile.type },
    };
    await blobClient.uploadData(Imagefile, options);
  }

