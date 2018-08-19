import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AdvertiserServiceClient {

  DOMAIN_URL = 'http://localhost:8080';
  ADVERTISER_URL = this.DOMAIN_URL + '/api/advertiser';

  constructor(private http: HttpClient) {
  }

  createAdvertiser(advertiser) {
    return this.http.post(this.ADVERTISER_URL, advertiser);
  }

  createAdvertisementsCreatedInNapsterArtistPage(artistId, advertiser, ad) {
    return this.http.post(this.ADVERTISER_URL + '/create/advertisement/napster?artist=' + artistId + '&advertiser=' + advertiser.id, ad);
  }

  createAdvertisementsCreatedInArtistPage(artistId, advertiser, ad) {
    return this.http.post(this.ADVERTISER_URL + '/create/advertisement?artist=' + artistId + '&advertiser=' + advertiser.id, ad);
  }

  findAdvertisementsByNapsterArtist(napsterArtistId, advertiserId) {
    return this.http.get(this.DOMAIN_URL + '/api/find/advertisement/' + napsterArtistId + '/in/napster/artist/' + advertiserId);
  }
}