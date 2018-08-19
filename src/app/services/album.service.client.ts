import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class AlbumServiceClient {

  DOMAIN_URL = 'http://localhost:8080';
  ALBUM_URL = this.DOMAIN_URL + '/api/album/';

  constructor(private http: HttpClient) {
  }

  findAlbumsByArtistId(artistId) {
    return this.http.get(this.ALBUM_URL + 'artist/' + artistId);
  }

  findAlbumById(aid) {
    return this.http.get(this.ALBUM_URL + aid);
  }

  findAlbumByName(name) {
    return this.http.get(this.ALBUM_URL + 'name/' + name);
  }

  findAllAlbums() {
    return this.http.get(this.ALBUM_URL);
  }
}
