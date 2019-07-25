import React from 'react';

export class Muistipeli extends React.Component {
    constructor(props) {
        super(props);
        this.state = {valittu1: 0, valitutLkm: 0, parit: 0, kortti: [], yritykset: 0, ratkaistu: false, peli:''};
        this.nappiaKlikattu = this.nappiaKlikattu.bind(this);
        this.uusiPeli = this.uusiPeli.bind(this);
    }
    
//    componentDidMount(){
//        this.setState({kortti: kortinMaarittely()});
//    }
    
    nappiaKlikattu(numero) {
        let valittu1 = this.state.valittu1;
        let valitutLkm = this.state.valitutLkm;
        let parit = this.state.parit;
        if (valitutLkm % 2 === 0) {
            this.setState({kortti: kaannaKortti(numero,this.state.kortti)});
            this.setState({valittu1: numero});
        } else if (valitutLkm % 2 === 1) {
            this.setState({kortti: kaannaKortti(numero,this.state.kortti)});
            if (samatKortit(valittu1, numero, this.state.kortti)) {
                setTimeout(()=>{
                    this.setState({kortti: poistaKortit(valittu1, numero, this.state.kortti)});
                    parit = parit + 1;
                    this.setState({parit: parit});
                    if (parit === 14) {
                        this.setState({ratkaistu: true});
                    }
                }, 250);
            } else {
                setTimeout(()=>{
                    this.setState({kortti: palautaKortit(valittu1, numero, this.state.kortti)});
                }, 500);
            }
            let yritykset = this.state.yritykset + 1;
            this.setState({yritykset: yritykset});
        }
        valitutLkm = valitutLkm + 1;
        this.setState({valitutLkm: valitutLkm});
    }

    uusiPeli(peli) {
        this.setState({kortti: kortinMaarittely(peli)});
        this.setState({valittu1: 0});
        this.setState({valitutLkm: 0});
        this.setState({parit: 0});
        this.setState({yritykset: 0});
        this.setState({ratkaistu: false});
        this.setState({peli: peli});
    }

    render() {
        let kortit = this.state.kortti.map(a => {
            const vari = a.vari;
            const fontinVari = a.fontinVari;
            const fontinkoko = a.fontinkoko;
            const vasen = a.vasen;
            const yla = a.yla;
            let tyyli = {
                width: 180,
                height: 180,
                position: 'fixed',
                left: vasen,
                top: yla,
                border: 0,
                cursor: 'pointer'
            }
            if (vari === 'White') {
                return null;
            } else if (this.state.peli === 'mari') {
                if (a.teksti === '') {
                    tyyli.backgroundColor = vari;
                    return (
                        <button  key={a.numero} onClick={() => this.nappiaKlikattu(a.numero)} style={tyyli}>{a.teksti}</button>
                    )
                } else {
                    return (
                        <button key={a.numero}><img src={'./images/'+a.teksti+'.jpg'} alt={a.teksti} onClick={() => this.nappiaKlikattu(a.numero)} style={tyyli} /></button>
                    )
                }
            } else {
                tyyli.fontSize = fontinkoko;
                tyyli.color = fontinVari;
                tyyli.backgroundColor = vari;
                return (
                    <button  key={a.numero} onClick={() => this.nappiaKlikattu(a.numero)} style={tyyli}>{a.teksti}</button>
                )
            }
        });
        return <div>
            {(!this.state.ratkaistu > 0) && <h2>Yrityksiä: {this.state.yritykset}
                &nbsp;&nbsp; <input key={'Digipore'} type="button" value="Digipore" onClick={() => this.uusiPeli("digipore")} />
                &nbsp;&nbsp; <input key={'USA'} type="button" value="USA" onClick={() => this.uusiPeli("usa")} />
                &nbsp;&nbsp; <input key={'Bonus'} type="button" value="Bonus" onClick={() => this.uusiPeli("mari")} />
            </h2>}
            {(this.state.ratkaistu > 0) && <h2>Yrityksiä: {this.state.yritykset}
                &nbsp;&nbsp; Kaikki parit löydetty.
                &nbsp;&nbsp; <input key={'Digipore'} type="button" value="Digipore" onClick={() => this.uusiPeli("digipore")} />
                &nbsp;&nbsp; <input key={'USA'} type="button" value="USA" onClick={() => this.uusiPeli("usa")} />
                &nbsp;&nbsp; <input key={'Bonus'} type="button" value="Bonus" onClick={() => this.uusiPeli("mari")} />
            </h2>}
            {kortit}
        </div>
    }

    handleChange = (value) => {
        this.setState({selected: value});
    }
}

function kortinMaarittely(peli) {
//  Muistipelin korttien määrittelyt ja tekstien arvonta.
    let kortti = [];
    let vasenAnkkuri = 70;
    let ylaAnkkuri = 90;
    for (let i = 0; i < 28; i++) {
        kortti[i] =
        {numero: i,
        x: (i % 7) + 1,
        y: Math.floor(i/4) + 1,
        vasen: vasenAnkkuri + 200*((i % 7)),
        yla: ylaAnkkuri + 200*(Math.floor(i/7)),
        teksti: '',
        vari: 'OrangeRed',
        fontinvari: 'Black',
        fontinkoko: 25,
        }
    }
    if (peli === 'digipore') {
        var tekstit1 = ['HTML','CSS','JS','React','Angular','Vue','C#','SQL','HTTP','Git','.NET','Azure','Scrum','npm'];
        var tekstit2 = tekstit1;
        var fontinVarit = ['Violet','DarkBlue','Black','SkyBlue','Red','SeaGreen','Pink','Green','Blue','Orange','Purple','LightSkyBlue','DarkCyan','DarkRed'];
        var tekstit = [];
        for (let i = 0; i < 14; i++) {
            tekstit.push(i);
        }
    } else if (peli === 'mari') {
        var tekstit1 = ['kuva1','kuva2','kuva3','kuva4','kuva5','kuva6','kuva7','kuva8','kuva9','kuva10','kuva11','kuva12','kuva13','kuva14'];
        var tekstit2 = tekstit1;
        var tekstit = [];
        for (let i = 0; i < 14; i++) {
            tekstit.push(i);
        }
    } else if (peli === 'usa') {
        var tekstit1 = [
            'Alabama',
            'Alaska',
            'Arizona',
            'Arkansas',
            'California',
            'Colorado',
            'Connecticut',
            'Delaware',
            'Florida',
            'Georgia',
            'Hawaii',
            'Idaho',
            'Illinois',
            'Indiana',
            'Iowa',
            'Kansas',
            'Kentucky',
            'Louisiana',
            'Maine',
            'Maryland',
            'Massachusetts',
            'Michigan',
            'Minnesota',
            'Mississippi',
            'Missouri',
            'Montana',
            'Nebraska',
            'Nevada',
            'New Hampshire',
            'New Jersey',
            'New Mexico',
            'New York',
            'North Carolina',
            'North Dakota',
            'Ohio',
            'Oklahoma',
            'Oregon',
            'Pennsylvania',
            'Rhode Island',
            'South Carolina',
            'South Dakota',
            'Tennessee',
            'Texas',
            'Utah',
            'Vermont',
            'Virginia',
            'Washington',
            'West Virginia',
            'Wisconsin',
            'Wyoming'
        ];
        var tekstit2 = [
            'Montgomery',
            'Juneau',
            'Phoenix',
            'Little Rock',
            'Sacramento',
            'Denver',
            'Hartford',
            'Dover',
            'Tallahassee',
            'Atlanta',
            'Honolulu',
            'Boise',
            'Springfield',
            'Indianapolis',
            'Des Moines',
            'Topeka',
            'Frankfort',
            'Baton Rouge',
            'Augusta',
            'Annapolis',
            'Boston',
            'Lansing',
            'St. Paul',
            'Jackson',
            'Jefferson City',
            'Helena',
            'Lincoln',
            'Carson City',
            'Concord',
            'Trenton',
            'Santa Fe',
            'Albany',
            'Raleigh',
            'Bismarck',
            'Columbus',
            'Oklahoma City',
            'Salem',
            'Harrisburg',
            'Providence',
            'Columbia',
            'Pierre',
            'Nashville',
            'Austin',
            'Salt Lake City',
            'Montpelier',
            'Richmond',
            'Olympia',
            'Charleston',
            'Madison',
            'Cheyenne'
        ];
        var tekstit = [];
        for (let i = 0; i < 49; i++) {
            tekstit.push(i);
        }
    }
    let paikat = [];
    for (let i = 0; i < 28; i++) {
        paikat.push(i);
    }
    for (let i = 0; i < 14; i++) {
        const ind = Math.floor(Math.random() * tekstit.length);
        const indeksi = tekstit[ind];
        const ind1 = Math.floor(Math.random() * paikat.length);
        const paikka1 = paikat[ind1];
        kortti[paikka1].tekstiKaannetty = tekstit1[indeksi];
        if (peli === 'digipore') {
            kortti[paikka1].fontinVari = fontinVarit[indeksi];
            kortti[paikka1].fontinkoko = 45;
        }
        kortti[paikka1].pari = indeksi;
        paikat.splice(ind1,1);
        const ind2 = Math.floor(Math.random() * paikat.length);
        const paikka2 = paikat[ind2];
        kortti[paikka2].tekstiKaannetty = tekstit2[indeksi];
        if (peli === 'digipore') {
            kortti[paikka2].fontinVari = fontinVarit[indeksi];
            kortti[paikka2].fontinkoko = 45;
        }
        kortti[paikka2].pari = indeksi;
        paikat.splice(ind2,1);
        tekstit.splice(ind,1);
    }
    return kortti;
}

function samatKortit(indeksi1, indeksi2, kortti) {
    let tulos = false;
    if (kortti[indeksi1].pari === kortti[indeksi2].pari) {
        tulos = true;
    }
    return tulos;
}   

function kaannaKortti(indeksi,kortti) {
    kortti[indeksi].vari = 'WhiteSmoke';
    kortti[indeksi].teksti = kortti[indeksi].tekstiKaannetty;
    return kortti;
}

function poistaKortit(indeksi1, indeksi2, kortti) {
    kortti[indeksi1].vari = 'White';
    kortti[indeksi1].teksti = '';
    kortti[indeksi2].vari = 'White';
    kortti[indeksi2].teksti = '';
    return kortti;
}

function palautaKortit(indeksi1, indeksi2, kortti) {
    kortti[indeksi1].vari = 'OrangeRed';
    kortti[indeksi1].teksti = '';
    kortti[indeksi2].vari = 'OrangeRed';
    kortti[indeksi2].teksti = '';
    return kortti;
}
