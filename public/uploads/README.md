# Uploads Directory

Questa directory contiene tutti i contenuti multimediali del sito OZ Extrait.

## Struttura

- `images/` - Immagini prodotti, hero, gallery
- `videos/` - Video promozionali e background
- `documents/` - PDF, cataloghi, schede tecniche

## Accesso Web

Tutti i file in questa directory sono accessibili pubblicamente via:
- https://oz.fodivps2.cloud/uploads/images/nome-file.jpg
- https://oz.fodivps2.cloud/uploads/videos/nome-file.mp4
- ecc.

## Upload

Puoi caricare file tramite:
1. **File Manager VPS Panel**: https://fodivps2.cloud/dashboard/files
2. **SCP**: `scp file.jpg sviluppatore@72.61.184.133:/var/www/projects/oz/public/uploads/images/`
3. **SFTP**: Usa qualsiasi client SFTP (FileZilla, Cyberduck, ecc.)

## Note

- Formati consigliati immagini: WebP, JPEG, PNG
- Formati consigliati video: MP4 (H.264)
- Ottimizza le immagini prima dell'upload per performance migliori
