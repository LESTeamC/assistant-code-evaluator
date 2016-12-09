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


