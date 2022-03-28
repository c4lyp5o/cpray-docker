const Cpray = require('cpray');
const cpray = new Cpray();
const axios = require('axios').default;
const redis = require('redis');
const redisClient = redis.createClient();

exports.comingHome = async (req, res, next) => {
    await redisClient.connect();
    const surah = await redisClient.json.get('fullQuran', { path: '.' });
    const ayats = surah[0].verses[0].text + ' ' + surah[0].verses[1].text + ' ' + surah[0].verses[2].text + ' ' + surah[0].verses[3].text + ' ' + surah[0].verses[4].text + ' ' + surah[0].verses[5].text + ' ' + surah[0].verses[6].text;
    const translations = surah[0].verses[0].translation + '. ' + surah[0].verses[1].translation + '. ' + surah[0].verses[2].translation + '. ' + surah[0].verses[3].translation + '. ' + surah[0].verses[4].translation + '. ' + surah[0].verses[5].translation + '. ' + surah[0].verses[6].translation + '.';
    res.render('index', { data: 'none', translations: translations, ayats: ayats });
    redisClient.disconnect();
    console.log('Quran is from redis');
}

exports.scoutingHome = (req, res, next) => {
    const url = req.body.zone;
    const validRedirect = [
        "kdh01","kdh02","kdh03","kdh04","kdh05","kdh06","kdh07",
        "mlk01",
        "ngs01","ngs02",
        "phg01","phg02","phg03","phg04","phg05","phg06",
        "prk01","prk02","prk03","prk04","prk05","prk06","prk07",
        "pls01",
        "png01",
        "sgr01","sgr02","sgr03",
        "trg01","trg02","trg03","trg04",
        "jhr01","jhr02","jhr03","jhr04",
        "ktn01","ktn03",
        "sbh01","sbh02","sbh03","sbh04","sbh05","sbh06","sbh07","sbh08","sbh09",
        "swk01","swk02","swk03","swk04","swk05","swk06","swk07","swk08","swk09",
        "wly01","wly02",
    ];
    res.redirect('/' + url);
}

exports.knowingHome = async (req, res) => {
    await redisClient.connect();
    const zoneReplace = {
        "kdh01": "KOTA SETAR, POKOK SENA DAN KUBANG PASU",
        "kdh02": "KUALA MUDA, PENDANG DAN YAN",
        "kdh03": "PADANG TERAP DAN SIK",
        "kdh04": "BALING",
        "kdh05": "KULIM DAN BANDAR BAHARU",
        "kdh06": "LANGKAWI",
        "kdh07": "GUNUNG JERAI",
        "mlk01": "SELURUH NEGERI MELAKA",
        "ngs01": "JEMPOL DAN TAMPIN",
        "ngs02": "PORT DICKSON, SEREMBAN, KUALA PILAH, JELEBU DAN REMBAU",
        "phg01": "PULAU TIOMAN",
        "phg02": "ROMPIN, PEKAN, MUADZAM SHAH DAN KUANTAN",
        "phg03": "MARAN, CHENOR, TEMERLOH, BERA, JENGKA DAN JERANTUT",
        "phg04": "BENTONG, RAUB DAN LIPIS",
        "phg05": "BUKIT TINGGI, GENTING SEMPAH, DAN JANDA BAIK",
        "phg06": "CAMERON HIGHLANDS, BUKIT FRASER DAN GENTING HIGHLANDS",
        "prk01": "TAPAH, SLIM RIVER DAN TANJUNG MALIM",
        "prk02": "IPOH, BATU GAJAH, KAMPAR, SG. SIPUT DAN KUALA KANGSAR",
        "prk03": "PENGKALAN HULU, GERIK DAN LENGGONG",
        "prk04": "TEMENGOR DAN BELUM",
        "prk05": "TELUK INTAN, BAGAN DATUK, KG. GAJAH, SERI ISKANDAR, BERUAS, PARIT, LUMUT, SITIAWAN DAN PULAU PANGKOR",
        "prk06": "SELAMA, TAIPING, BAGAN SERAI DAN PARIT BUNTAR",
        "prk07": "BUKIT LARUT",
        "pls01": "SELURUH NEGERI PERLIS",
        "png01": "SELURUH NEGERI PULAU PINANG",
        "sgr01": "HULU SELANGOR, GOMBAK, PETALING/SHAH ALAM, HULU LANGAT DAN SEPANG",
        "sgr02": "SABAK BERNAM DAN KUALA SELANGOR",
        "sgr03": "KLANG DAN KUALA LANGAT",
        "trg01": "KUALA TERENGGANU, MARANG DAN KUALA NERUS",
        "trg02": "BESUT DAN SETIU",
        "trg03": "HULU TERENGGANU",
        "trg04": "DUNGUN DAN KEMAMAN",
        "jhr01": "PULAU AUR DAN PULAU PEMANGGIL",
        "jhr02": "KOTA TINGGI, MERSING DAN JOHOR BAHRU",
        "jhr03": "KLUANG DAN PONTIAN",
        "jhr04": "BATU PAHAT, MUAR, SEGAMAT DAN GEMAS JOHOR",
        "ktn01": "JAJAHAN KOTA BHARU, BACHOK, PASIR PUTEH, TUMPAT , PASIR MAS, TANAH MERAH, MACHANG KUALA KRAI DAN GUA MUSANG (DAERAH CHIKU)",
        "ktn03": "JAJAHAN JELI, GUA MUSANG (DAERAH GALAS DAN BERTAM) DAN JAJAHAN KECIL LOJING",
        "sbh01": "BAHAGIAN SANDAKAN (TIMUR) BANDAR SANDAKAN, BUKIT GARAM, SEMAWANG, TEMANGGONG DAN TAMBISAN",
        "sbh02": "BAHAGIAN SANDAKAN (BARAT) PINANGAH, TERUSAN, BELURAN, KUAMUT DAN TELUPID",
        "sbh03": "BAHAGIAN TAWAU (TIMUR) LAHAD DATU, KUNAK, SILABUKAN, TUNGKU, SAHABAT, DAN SEMPORNA",
        "sbh04": "BAHAGIAN TAWAU (BARAT), BANDAR TAWAU, BALONG, MEROTAI DAN KALABAKAN",
        "sbh05": "BAHAGIAN KUDAT KUDAT, KOTA MARUDU, PITAS DAN PULAU BANGGI",
        "sbh06": "GUNUNG KINABALU",
        "sbh07": "BAHAGIAN PANTAI BARAT KOTA KINABALU, PENAMPANG, TUARAN, PAPAR, KOTA BELUD, PUTATAN DAN RANAU",
        "sbh08": "BAHAGIAN PEDALAMAN (ATAS) PENSIANGAN, KENINGAU, TAMBUNAN DAN NABAWAN",
        "sbh09": "BAHAGIAN PEDALAMAN (BAWAH) SIPITANG, MEMBAKUT, BEAUFORT, KUALA PENYU, WESTON, TENOM DAN LONG PA SIA",
        "swk01": "LIMBANG, SUNDAR, TRUSAN DAN LAWAS",
        "swk02": "NIAH, SIBUTI, MIRI, BEKENU DAN MARUDI",
        "swk03": "TATAU, SUAI, BELAGA, PANDAN, SEBAUH, BINTULU",
        "swk04": "IGAN, KANOWIT, SIBU, DALAT, OYA, BALINGIAN, MUKAH, KAPIT DAN SONG",
        "swk05": "BELAWAI, MATU, DARO, SARIKEI, JULAU, BINTANGOR DAN RAJANG",
        "swk06": "KABONG, LINGGA, SRI AMAN, ENGKELILI, BETONG, SPAOH, PUSA, SARATOK, ROBAN, DEBAK DAN LUBOK ANTU",
        "swk07": "SAMARAHAN, SIMUNJAN, SERIAN, SEBUYAU DAN MELUDAM",
        "swk08": "KUCHING, BAU, LUNDU DAN SEMATAN",
        "swk09": "KAMPUNG PATARIKAN",
        "wly01": "KUALA LUMPUR DAN PUTRAJAYA",
        "wly02": "LABUAN", };
        var theDay = new Date().getDay();
        var theMonth = new Date().getMonth();
        if (theDay === 1 && theMonth === 1) {
            const timeValue = await cpray.getTimesbyYear(req.params.zone);
            await redisClient.json.set(req.params.zone, '.', timeValue, 'EX', 15552000);
            console.log('new year is here. now caching');
        } else {
            console.log('not new year yet');
            }
        const dayOfYear = date => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const numberDay = (dayOfYear(new Date()) - 1);
        const value = await redisClient.json.get(req.params.zone, { path: '.prayerTime'});
        if (value === null || value.length === 0) {
            const timeValue = await cpray.getTimesbyYear(req.params.zone);
            await redisClient.json.set(req.params.zone, '.', timeValue, 'EX', 15552000);
            const redisVal = await redisClient.json.get(req.params.zone, { path: '.prayerTime'});
            const realZone = zoneReplace[req.params.zone];
            res.render('index', { data: redisVal, zone: realZone, day: numberDay });
            console.log('no redis cache. now caching');
        }
        else {                        
            const realZone = zoneReplace[req.params.zone];
            res.render('index', { data: value, zone: realZone, day: numberDay });
            console.log('using redis cache');
        }
        redisClient.disconnect();
    }

exports.getWholeQuran = async (req, res, next) => {
    await redisClient.connect();
    const quranAyat = await axios.get('https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_id.json');
    await redisClient.json.set('fullQuran', '.', quranAyat.data);
    console.log('Quran Ayat is empty. now cached in redis');
    redisClient.disconnect();
}