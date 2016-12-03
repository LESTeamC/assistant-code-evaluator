import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

declare var JSZip: any;

@Injectable()
export class ZipService {

    constructor() { }

    getNamesFromZip(file: File) {
        let zip = new JSZip();

        return Observable.create((observer: any) => {

            var filesFromZip: string[] = new Array<string>();
            zip.loadAsync(file)
                .then((zip: any) => {
                    for (let file in zip.files) {
                        filesFromZip.push(zip.files[file].name);
                    }
                    observer.next(filesFromZip);
                    observer.complete();
            })

        })
    }
}


    /*                    console.log(fileInZip);
                        zip.file(fileInZip.name)
                            .async("arraybuffer")
                            .then((content: any) => {
                                let buffer = new Uint8Array(content);
                                let blob = new Blob([buffer.buffer]);
                                // here is where I want to push this object into the filesFromZip object somehow....
                                filesFromZip.push({
                                    fileName: fileInZip.name,
                                    blobURL: URL.createObjectURL(blob)
                                });
                            });*/


