import React from 'react';

function onkoSiirtoMahdollinen(nappula, nappulanIndeksi) {
// Testataan voiko nappulaa, jonka indeksi on nappulanIndeksi, siirtää eli
// onko sen naapurissa tyhjä (nappula[0]).
    let tulos = false;
    let j = nappulanIndeksi;
    if (nappula[j].x === nappula[0].x && (nappula[j].y === nappula[0].y - 1 || nappula[j].y === nappula[0].y + 1)) {
        tulos = true; 
    }
    if (nappula[j].y === nappula[0].y && (nappula[j].x === nappula[0].x - 1 || nappula[j].x === nappula[0].x + 1)) {
        tulos = true;
    }
    return tulos;
}

function vaihto(nappula, vaihdettavanIndeksi) {
// Siirto. Tyhjän ja nappulan paikan ja koordinaattien
// vaihtaminen keskenään.
    let puppaikka = nappula[0].paikka;
    let pupx = nappula[0].x;
    let pupy = nappula[0].y;
    let pupvasen = nappula[0].vasen;
    let pupyla = nappula[0].yla;
    nappula[0].paikka = nappula[vaihdettavanIndeksi].paikka;
    nappula[0].x = nappula[vaihdettavanIndeksi].x;
    nappula[0].y = nappula[vaihdettavanIndeksi].y;
    nappula[0].vasen = nappula[vaihdettavanIndeksi].vasen;
    nappula[0].yla = nappula[vaihdettavanIndeksi].yla;
    nappula[vaihdettavanIndeksi].paikka = puppaikka;
    nappula[vaihdettavanIndeksi].x = pupx;
    nappula[vaihdettavanIndeksi].y = pupy;
    nappula[vaihdettavanIndeksi].vasen = pupvasen;
    nappula[vaihdettavanIndeksi].yla = pupyla;
    return nappula;
}

function onkoRatkaistu(nappula) {
// Tutkitaan, ovatko nappulat oikeilla paikoillaan (numerojärjestyksessä).
    for (let i = 1; i < 16; i++) {
        if (nappula[i].paikka !== nappula[i].numero) {
            return false;
        }
    }
    return true;
}

function alkuasetelma() {
// Haetaan alkuasetelma lähtemällä liikkeelle tilanteesta, jossa
// nappulat ovat oikeassa järjestyksessä. Selvitetään nappulat, joita
// voidaan siirtaa ja arvotaan näistä se, jota siirretään. Seuraavalla
// kerralla ei siirretä sitä, jota siirrettiin edellisellä kerralla.
// Tätä toistetaan 50 - 100 (muuttuja siirtoja) kertaa. Aloitetaan
// alusta, jos arvonnan jälkeen nappulat ovat oikeassa järjestyksessä
// (hyvin epätodennäköistä).
    let nappula = [];
    let vasenAnkkuri = -20;
    let ylaAnkkuri = 0;
    nappula[0] =
    {numero: 16,
    paikka: 16,
    x: 4,
    y: 4,
    vari: 'black',
    fontinVari: 'black',
    vasen: vasenAnkkuri + 100*4,
    yla: ylaAnkkuri + 100*4
    }
    for (let i = 1; i < 16; i++) {
        nappula[i] =
        {numero: i,
        paikka: i,
        x: ((i-1) % 4) + 1,
        y: Math.floor((i-1)/4) + 1,
        vari: 'white',
        fontinVari: 'goldenrod',
        vasen: vasenAnkkuri + 100*(((i-1) % 4) + 1),
        yla: ylaAnkkuri + 100*(Math.floor((i-1)/4) + 1)
        }
    }
    let punainen = 'red';
    nappula[1].vari = punainen;
    nappula[3].vari = punainen;
    nappula[6].vari = punainen;
    nappula[8].vari = punainen;
    nappula[9].vari = punainen;
    nappula[11].vari = punainen;
    nappula[14].vari = punainen;
    while (true) {
        const siirtoja = Math.floor(Math.random() * 51) + 50;
        let edellinenSiirrettava = 0;
        for (let i = 0; i < siirtoja; i++) {
            let mahdollistaSiirtaa = [];
            for (let j = 1; j < 16; j++) {
                if (onkoSiirtoMahdollinen(nappula, j)) {
                    mahdollistaSiirtaa.push(j); 
                }
            }
            if (i > 0) {
                let indeksi = mahdollistaSiirtaa.indexOf(edellinenSiirrettava);
                mahdollistaSiirtaa.splice(indeksi,1);
            }
            let indeksiRandom = Math.floor(Math.random() * mahdollistaSiirtaa.length);
            let siirrettava = mahdollistaSiirtaa[indeksiRandom];
            edellinenSiirrettava = siirrettava;
            vaihto(nappula, siirrettava);
        }
        if (!onkoRatkaistu(nappula)) {
            break;
        }   
    }
    return nappula;
}

const Tausta = () => {
    let vasenAnkkuri = -20;
    let ylaAnkkuri = 0;
    let tyyli = {
        width: 420,
        height: 420,
        backgroundColor: 'black',
        position: 'fixed',
        left: vasenAnkkuri + 100 - 10,
        top: ylaAnkkuri + 100 - 10
    }
    return (
        <div>
            <button style={tyyli}></button>
        </div>
    )
}

export class Peli15 extends React.Component {
    constructor(props) {
        super(props);
        this.state={nappula:[], klikattu: 0, ratkaistu: false, peli:''};
        this.nappiaKlikattu = this.nappiaKlikattu.bind(this);
        this.uusiPeli = this.uusiPeli.bind(this);
    } 
    
    componentDidMount() {
        this.setState({nappula: alkuasetelma()});
    }

    nappiaKlikattu(numero) {
        if (onkoSiirtoMahdollinen(this.state.nappula, numero)) {
            this.setState({nappula: vaihto(this.state.nappula, numero)});
            let klikattu = this.state.klikattu + 1;
            this.setState({klikattu: klikattu});
            if (onkoRatkaistu(this.state.nappula)) {
                this.setState({ratkaistu: true});
            }
        }
    }

    uusiPeli(peli) {
        this.setState({nappula: alkuasetelma()});
        this.setState({klikattu: 0});
        this.setState({ratkaistu: false});
        this.setState({peli: peli});
    }

    render() {
        let nappulat = this.state.nappula.map(a => {
            const vari = a.vari;
            const fontinVari = a.fontinVari;
            const vasen = a.vasen;
            const yla = a.yla;
            let tyyli = {
                width: 99,
                height: 99,
                backgroundColor: vari,
                color: fontinVari,
                position: 'fixed',
                left: vasen,
                top: yla,
                fontSize: 60,
                border: 0
            }
            if (a.numero===16) {
                return <button key={a.numero} style={tyyli}>{a.numero}</button>
            } else if (this.state.peli === 'bonus') {
                tyyli.cursor = 'pointer';
                tyyli.width = 100;
                tyyli.height = 100;
                return <button key={a.numero}><img src={'./images2/osa'+a.numero+'.jpg'} alt={a.numero} onClick={() => this.nappiaKlikattu(a.numero)} style={tyyli} /></button>
            } else {
                tyyli.cursor = 'pointer';
                return <button key={a.numero} onClick={() => this.nappiaKlikattu(a.numero)} style={tyyli}>{a.numero}</button>
            }
        });
        return <div>
            {(!this.state.ratkaistu) && <h2>Siirtoja: {this.state.klikattu} 
                &nbsp;&nbsp; <button onClick={() => this.uusiPeli("original")}>Original</button>
                &nbsp;&nbsp; <button onClick={() => this.uusiPeli("bonus")}>Bonus</button>
            </h2>}
            {(this.state.ratkaistu) && <h2>Siirtoja: {this.state.klikattu}
                &nbsp;&nbsp; Ratkaistu.
                &nbsp;&nbsp; <button onClick={() => this.uusiPeli("original")}>Original</button>
                &nbsp;&nbsp; <button onClick={() => this.uusiPeli("bonus")}>Bonus</button>
            </h2>}
            <Tausta />
            {nappulat}
        </div>
    }

}
