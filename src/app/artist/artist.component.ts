import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Person} from '../models/Person';
import {PersonServiceClient} from '../services/person.service.client';
import {Album} from '../models/Album';
import {ArtistServiceClient} from '../services/artist.service.client';
import {Artist} from '../models/Artist';
import {NapsterServiceClient} from '../services/napster.service.client';
import {AdvertiserServiceClient} from '../services/advertiser.service.client';
import {Advertisement} from '../models/Advertisement';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artistId: String;
  person: Person;
  artistResult: Artist;
  imageURL: String;
  albums: Album[];
  bio: String;
  isNapster: boolean;
  newAdvertisement: Advertisement;
  finalArtistId;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private napsterService: NapsterServiceClient,
              private personService: PersonServiceClient,
              private artistService: ArtistServiceClient,
              private advertiserService: AdvertiserServiceClient) {
  }

  fetchFromNapster(artistId) {
    this.napsterService.findArtistById(artistId)
      .subscribe(response => {
          this.artistResult = response['artists'][0];
          this.bio = response['artists'][0]['bios'][0]['bio'];
          console.log(response['artists'][0]);
          this.napsterService.getArtistImage(response['artists'][0]['links']['images']['href'])
            .subscribe(resp => {
                this.imageURL = resp['images'][0].url;
              },
              error => alert('Server couldn\'t find an artist image!'));
          this.napsterService.getArtistAlbums(response['artists'][0]['links']['albums']['href'])
            .subscribe(resp => {
                this.albums = resp['albums'];
                console.log(this.albums);
              },
              error => alert('Server couldn\'t find an artist albums!'));
        },
        error => alert('Napster Server threw an error!'));
  }

  ngOnInit() {

    this.newAdvertisement = new Advertisement();
    this.isNapster = false;
    this.artistId = this.route.snapshot.paramMap.get('id');
    this.personService.checkSession().subscribe(
      (person: Person) => {
        this.person = person;
      }
      , error => alert('could not load user'));
    if (this.artistId.indexOf('art') >= 0) {
      this.artistId = this.artistId.split('.').pop();
      this.isNapster = true;
    }
    this.finalArtistId = this.artistId;
    this.artistService.findArtistById(this.artistId)
      .subscribe(
        (response: Artist) => {
          if (response) {
            if (response.napsterId) {
              this.fetchFromNapster('art.' + response.napsterId);
            } else {
              this.artistResult = response;
              this.imageURL = 'https://cloud.netlifyusercontent.com/assets/' +
                '344dbf88-fdf9-42bb-adb4-46f01eedd629/514dc845-04f5-4538-8a4f-869b64243265/1-2.jpg';
            }
          } else {
            this.fetchFromNapster(this.artistId);
          }
        },
        error => alert('Our Server threw an error!'));
  }

  goToAlbumPage(aid) {
    this.router.navigate(['album' + '/' + aid]);
  }

  refreshAdvertsements(adModal) {
    adModal.close();
  }

  addAvertisement(ad) {
    if (this.isNapster) {
      this.advertiserService.createAdvertisementsCreatedInNapsterArtistPage(this.artistId, this.person, ad)
        .subscribe(response => response);
    } else {
      this.advertiserService.createAdvertisementsCreatedInArtistPage(this.artistId, this.person, ad)
        .subscribe(response => response);
    }
  }

}