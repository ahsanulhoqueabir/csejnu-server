async function authorize() {
  const jwtClient = new google.auth.JWT(
    apikeys.client_email,
    null,
    apikeys.private_key,
    SCOPE
  );
  await jwtClient.authorize();
  return jwtClient;
}

async function uploadFile(authClient, data) {
  return new Promise((resolve, rejected) => {
    const drive = google.drive({ version: "v3", auth: authClient });
    var fileMetaData = {
      name: "",
      parents: ["1tXD8zMx9VWZecyhlJcdr6Jp30YtNXsHL"], // A folder ID to which file will get uploaded
    };
    drive.files.create(
      {
        resource: fileMetaData,
        media: {
          body: fs.createReadStream("text.txt"), // files that will get uploaded
          //   mimeType: "text/plain",
          mimeType: {
            pdf: "application/pdf",
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            png: "image/png",
            gif: "image/gif",
            txt: "text/plain",
            bmp: "image/bmp",
            tiff: "image/tiff",
            webp: "image/webp",
            svg: "image/svg+xml",
          },
        },
        fields: "id",
      },
      function (error, file) {
        if (error) {
          return rejected(error);
        } else {
          resolve(file);
          console.log(file);
        }
      }
    );
  });
}

authorize().then(uploadFile(data)).catch("error", console.error());
