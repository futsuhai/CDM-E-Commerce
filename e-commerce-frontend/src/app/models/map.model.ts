import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export class MapData {
    location: string;
    link: SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer, location: string, link: string) {
        this.location = location;
        const sanitizedLink = this.sanitizeURL(link);

        if (!sanitizedLink) {
            throw new Error('Unsafe URL: ' + link);
        } else {
            this.link = sanitizedLink;
        }
    }

    private sanitizeURL(url: string): SafeResourceUrl | null {
        try {
            const sanitized = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            return sanitized;
        } catch (error) {
            console.error('Sanitization error:', error);
            return null;
        }
    }
}

export interface IMapData {
    location: string,
    link: string
}