import FDataGrid from '@/components/FDataGrid/FDataGrid.vue';
import FFilters from '@/components/FFilters/FFilters.vue';
import FFormInput from '@/components/FFormInput/FFormInput.vue';
import FInput from '@/components/FInput/FInput.vue';
import FComboBox from '@/components/FComboBox/FComboBox.vue';
import FOption from '@/components/FOption/FOption.vue';
import { clone } from '@/utils';
import { compareLocalizedStringProperty } from '@/utils/array-sorting.js';

const columns = [
    {
        name: 'id',
        label: 'ID',
    },
    {
        name: 'first_name',
        label: 'First Name',
    },
    {
        name: 'last_name',
        label: 'Last Name',
    },
    {
        name: 'email',
        label: 'Email',
    },
    {
        name: 'ip_address',
        label: 'IP',
    },
];

const rows = [
    {
        id: 1,
        first_name: 'Susie',
        last_name: 'Marwood',
        email: 'smarwood0@eventbrite.com',
        ip_address: '123.190.103.191',
    },
    {
        id: 2,
        first_name: 'Ericha',
        last_name:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolor ducimus enim impedit minima molestias quae qui!',
        email: 'ehacking1@pcworld.com',
        ip_address: '145.239.199.81',
        cssClass: ['row2', 'not1'],
    },
    {
        id: 3,
        first_name: 'Lorain',
        last_name: 'Brophy',
        email: 'lbrophy2@independent.co.uk',
        ip_address: '95.255.175.237',
    },
    {
        id: 4,
        first_name: 'Griselda',
        last_name: 'Bugby',
        email: 'gbugby3@networksolutions.com',
        ip_address: '46.130.164.255',
    },
    {
        id: 5,
        first_name: 'Roxana',
        last_name: 'Rodenburgh',
        email: 'rrodenburgh4@naver.com',
        ip_address: '137.98.205.236',
    },
    {
        id: 6,
        first_name: 'Susy',
        last_name: 'Fison',
        email: 'sfison5@jugem.jp',
        ip_address: '173.83.54.118',
    },
    {
        id: 7,
        first_name: 'Ava',
        last_name: 'Amiable',
        email: 'aamiable6@fda.gov',
        ip_address: '7.125.83.45',
    },
    {
        id: 8,
        first_name: 'Bevin',
        last_name: 'Ossipenko',
        email: 'bossipenko7@i2i.jp',
        ip_address: '201.185.73.2',
    },
    {
        id: 9,
        first_name: 'Honey',
        last_name: 'Scripture',
        email: 'hscripture8@tinyurl.com',
        ip_address: '16.117.56.29',
    },
    {
        id: 10,
        first_name: 'Meggie',
        last_name: 'Corss',
        email: 'mcorss9@cnn.com',
        ip_address: '81.231.190.214',
    },
    {
        id: 11,
        first_name: 'Easter',
        last_name: 'Spencley',
        email: 'espencleya@fastcompany.com',
        ip_address: '167.146.66.229',
    },
    {
        id: 12,
        first_name: 'Aile',
        last_name: 'Sherr',
        email: 'asherrb@freewebs.com',
        ip_address: '119.197.94.130',
    },
    {
        id: 13,
        first_name: 'Chaddie',
        last_name: 'Childes',
        email: 'cchildesc@moonfruit.com',
        ip_address: '27.185.86.138',
    },
    {
        id: 14,
        first_name: 'Viv',
        last_name: 'Benjamin',
        email: 'vbenjamind@hatena.ne.jp',
        ip_address: '116.120.236.216',
    },
    {
        id: 15,
        first_name: 'Angelina',
        last_name: 'Kenan',
        email: 'akenane@canalblog.com',
        ip_address: '247.127.251.103',
    },
    {
        id: 16,
        first_name: 'Boyce',
        last_name: 'Togwell',
        email: 'btogwellf@engadget.com',
        ip_address: '76.45.127.194',
    },
    {
        id: 17,
        first_name: 'Charline',
        last_name: 'Pecha',
        email: 'cpechag@accuweather.com',
        ip_address: '7.153.219.54',
    },
    {
        id: 18,
        first_name: 'Ellswerth',
        last_name: 'Siddon',
        email: 'esiddonh@princeton.edu',
        ip_address: '66.152.216.171',
    },
    {
        id: 19,
        first_name: 'Nickolaus',
        last_name: 'Lovett',
        email: 'nlovetti@edublogs.org',
        ip_address: '57.99.181.197',
    },
    {
        id: 20,
        first_name: 'Niki',
        last_name: 'Trobey',
        email: 'ntrobeyj@webeden.co.uk',
        ip_address: '117.61.115.115',
    },
    {
        id: 21,
        first_name: 'Robby',
        last_name: 'Klossmann',
        email: 'rklossmannk@wix.com',
        ip_address: '79.116.32.207',
    },
    {
        id: 22,
        first_name: 'Debi',
        last_name: 'Mac Giany',
        email: 'dmacgianyl@artisteer.com',
        ip_address: '64.10.163.30',
    },
    {
        id: 23,
        first_name: 'Kirbie',
        last_name: 'McElmurray',
        email: 'kmcelmurraym@livejournal.com',
        ip_address: '110.194.116.126',
    },
    {
        id: 24,
        first_name: 'Rayshell',
        last_name: 'Butterly',
        email: 'rbutterlyn@cdc.gov',
        ip_address: '5.23.104.119',
    },
    {
        id: 25,
        first_name: 'Tripp',
        last_name: 'McIan',
        email: 'tmciano@diigo.com',
        ip_address: '1.102.153.173',
    },
    {
        id: 26,
        first_name: 'Lila',
        last_name: 'Chilley',
        email: 'lchilleyp@istockphoto.com',
        ip_address: '102.68.82.195',
    },
    {
        id: 27,
        first_name: 'Dorthea',
        last_name: 'Simka',
        email: 'dsimkaq@acquirethisname.com',
        ip_address: '114.1.195.208',
    },
    {
        id: 28,
        first_name: 'Wallie',
        last_name: 'Desesquelle',
        email: 'wdesesqueller@skyrock.com',
        ip_address: '133.120.188.246',
    },
    {
        id: 29,
        first_name: 'Rosy',
        last_name: 'Easterfield',
        email: 'reasterfields@tripod.com',
        ip_address: '9.249.98.207',
    },
    {
        id: 30,
        first_name: 'Arlene',
        last_name: 'Bernade',
        email: 'abernadet@sun.com',
        ip_address: '72.191.156.26',
    },
    {
        id: 31,
        first_name: 'Marie-jeanne',
        last_name: 'Andren',
        email: 'mandrenu@cnn.com',
        ip_address: '225.96.50.81',
    },
    {
        id: 32,
        first_name: 'Torin',
        last_name: 'Sharpley',
        email: 'tsharpleyv@ow.ly',
        ip_address: '237.65.134.236',
    },
    {
        id: 33,
        first_name: 'Rois',
        last_name: 'Sonner',
        email: 'rsonnerw@disqus.com',
        ip_address: '38.251.221.109',
    },
    {
        id: 34,
        first_name: 'Carissa',
        last_name: 'Alf',
        email: 'calfx@dedecms.com',
        ip_address: '241.98.30.45',
    },
    {
        id: 35,
        first_name: 'Tabbatha',
        last_name: 'Maccraw',
        email: 'tmaccrawy@cbsnews.com',
        ip_address: '229.198.187.149',
    },
    {
        id: 36,
        first_name: 'Claire',
        last_name: 'Pyle',
        email: 'cpylez@slashdot.org',
        ip_address: '49.40.153.185',
    },
    {
        id: 37,
        first_name: 'Hortense',
        last_name: 'Twiggs',
        email: 'htwiggs10@sitemeter.com',
        ip_address: '206.53.78.40',
    },
    {
        id: 38,
        first_name: 'Kinsley',
        last_name: 'Staneland',
        email: 'kstaneland11@state.tx.us',
        ip_address: '10.59.100.132',
    },
    {
        id: 39,
        first_name: 'Olag',
        last_name: 'Gwilliam',
        email: 'ogwilliam12@surveymonkey.com',
        ip_address: '178.97.142.91',
    },
    {
        id: 40,
        first_name: 'Fina',
        last_name: 'Daton',
        email: 'fdaton13@craigslist.org',
        ip_address: '16.29.5.199',
    },
    {
        id: 41,
        first_name: 'Fidel',
        last_name: 'Ellam',
        email: 'fellam14@wikispaces.com',
        ip_address: '17.213.65.110',
    },
    {
        id: 42,
        first_name: 'Rafael',
        last_name: 'Marwood',
        email: 'rmarwood15@webeden.co.uk',
        ip_address: '41.169.177.79',
    },
    {
        id: 43,
        first_name: 'Sara',
        last_name: 'Hurich',
        email: 'shurich16@trellian.com',
        ip_address: '78.196.48.52',
    },
    {
        id: 44,
        first_name: 'Andree',
        last_name: 'Blackler',
        email: 'ablackler17@addthis.com',
        ip_address: '138.199.105.156',
    },
    {
        id: 45,
        first_name: 'Vonny',
        last_name: 'Giacobilio',
        email: 'vgiacobilio18@cbslocal.com',
        ip_address: '103.23.171.81',
    },
    {
        id: 46,
        first_name: 'Faith',
        last_name: 'Travis',
        email: 'ftravis19@reverbnation.com',
        ip_address: '119.197.15.28',
    },
    {
        id: 47,
        first_name: 'Nikolaus',
        last_name: 'Pattenden',
        email: 'npattenden1a@paypal.com',
        ip_address: '89.18.116.126',
    },
    {
        id: 48,
        first_name: 'Dix',
        last_name: 'Allison',
        email: 'dallison1b@umn.edu',
        ip_address: '223.51.23.200',
    },
    {
        id: 49,
        first_name: 'Karee',
        last_name: 'Strettle',
        email: 'kstrettle1c@paypal.com',
        ip_address: '15.48.9.203',
    },
    {
        id: 50,
        first_name: 'Paxon',
        last_name: 'Jelliman',
        email: 'pjelliman1d@homestead.com',
        ip_address: '111.62.97.109',
    },
    {
        id: 51,
        first_name: 'Livvie',
        last_name: 'Wallwork',
        email: 'lwallwork1e@bravesites.com',
        ip_address: '20.167.214.175',
    },
    {
        id: 52,
        first_name: 'Randy',
        last_name: 'Bofield',
        email: 'rbofield1f@vkontakte.ru',
        ip_address: '88.95.78.54',
    },
    {
        id: 53,
        first_name: 'Karalee',
        last_name: 'Oakman',
        email: 'koakman1g@goo.ne.jp',
        ip_address: '24.174.182.241',
    },
    {
        id: 54,
        first_name: 'Nickie',
        last_name: 'Dovington',
        email: 'ndovington1h@theguardian.com',
        ip_address: '225.142.170.128',
    },
    {
        id: 55,
        first_name: 'Findley',
        last_name: 'Hune',
        email: 'fhune1i@multiply.com',
        ip_address: '234.129.207.149',
    },
    {
        id: 56,
        first_name: 'Althea',
        last_name: 'Hillaby',
        email: 'ahillaby1j@google.com.hk',
        ip_address: '0.148.210.25',
    },
    {
        id: 57,
        first_name: 'Nikolas',
        last_name: 'Philipet',
        email: 'nphilipet1k@dailymotion.com',
        ip_address: '13.18.0.215',
    },
    {
        id: 58,
        first_name: 'Sigvard',
        last_name: 'Hane',
        email: 'shane1l@last.fm',
        ip_address: '41.241.60.233',
    },
    {
        id: 59,
        first_name: 'Licha',
        last_name: 'Lee',
        email: 'llee1m@bing.com',
        ip_address: '100.117.254.55',
    },
    {
        id: 60,
        first_name: 'Amaleta',
        last_name: 'Halward',
        email: 'ahalward1n@nba.com',
        ip_address: '203.98.33.98',
    },
    {
        id: 61,
        first_name: 'Jaquenette',
        last_name: 'Petru',
        email: 'jpetru1o@imgur.com',
        ip_address: '168.83.84.30',
    },
    {
        id: 62,
        first_name: 'Kinsley',
        last_name: 'Matthessen',
        email: 'kmatthessen1p@imdb.com',
        ip_address: '110.172.2.136',
    },
    {
        id: 63,
        first_name: 'Hermie',
        last_name: 'Stambridge',
        email: 'hstambridge1q@youku.com',
        ip_address: '211.50.191.172',
    },
    {
        id: 64,
        first_name: 'Larina',
        last_name: 'Behneke',
        email: 'lbehneke1r@merriam-webster.com',
        ip_address: '125.241.254.229',
    },
    {
        id: 65,
        first_name: 'Lindsey',
        last_name: 'Champion',
        email: 'lchampion1s@t-online.de',
        ip_address: '148.15.75.250',
    },
    {
        id: 66,
        first_name: 'Benny',
        last_name: 'Malinowski',
        email: 'bmalinowski1t@cisco.com',
        ip_address: '91.90.67.56',
    },
    {
        id: 67,
        first_name: 'Jemmy',
        last_name: 'Maytom',
        email: 'jmaytom1u@zdnet.com',
        ip_address: '244.60.201.63',
    },
    {
        id: 68,
        first_name: 'Lizette',
        last_name: 'Turnell',
        email: 'lturnell1v@cocolog-nifty.com',
        ip_address: '88.49.159.46',
    },
    {
        id: 69,
        first_name: 'Conan',
        last_name: 'Pardi',
        email: 'cpardi1w@redcross.org',
        ip_address: '69.126.4.190',
    },
    {
        id: 70,
        first_name: 'Gus',
        last_name: 'Vlies',
        email: 'gvlies1x@blogs.com',
        ip_address: '38.102.6.225',
    },
    {
        id: 71,
        first_name: 'Dael',
        last_name: 'Aggiss',
        email: 'daggiss1y@w3.org',
        ip_address: '128.135.101.19',
    },
    {
        id: 72,
        first_name: 'Jana',
        last_name: 'Chittie',
        email: 'jchittie1z@nytimes.com',
        ip_address: '81.72.197.103',
    },
    {
        id: 73,
        first_name: 'Daloris',
        last_name: 'Darling',
        email: 'ddarling20@cnet.com',
        ip_address: '181.186.241.177',
    },
    {
        id: 74,
        first_name: 'Noble',
        last_name: 'Clemendot',
        email: 'nclemendot21@mashable.com',
        ip_address: '181.221.63.212',
    },
    {
        id: 75,
        first_name: 'Woodman',
        last_name: 'Loosmore',
        email: 'wloosmore22@360.cn',
        ip_address: '224.155.193.124',
    },
    {
        id: 76,
        first_name: 'Dela',
        last_name: 'Spyer',
        email: 'dspyer23@slate.com',
        ip_address: '50.1.235.217',
    },
    {
        id: 77,
        first_name: 'Aylmer',
        last_name: 'Ewert',
        email: 'aewert24@sohu.com',
        ip_address: '56.34.213.7',
    },
    {
        id: 78,
        first_name: 'Magdalena',
        last_name: 'Dukesbury',
        email: 'mdukesbury25@bandcamp.com',
        ip_address: '2.216.75.157',
    },
    {
        id: 79,
        first_name: 'Leta',
        last_name: 'Bende',
        email: 'lbende26@dion.ne.jp',
        ip_address: '187.178.79.243',
    },
    {
        id: 80,
        first_name: 'Joellyn',
        last_name: 'Ricci',
        email: 'jricci27@columbia.edu',
        ip_address: '121.167.62.206',
    },
    {
        id: 81,
        first_name: 'Jacklin',
        last_name: 'Kira',
        email: 'jkira28@fastcompany.com',
        ip_address: '226.35.117.250',
    },
    {
        id: 82,
        first_name: 'Giraldo',
        last_name: 'Connett',
        email: 'gconnett29@ow.ly',
        ip_address: '92.138.217.17',
    },
    {
        id: 83,
        first_name: 'Sallie',
        last_name: 'Ashment',
        email: 'sashment2a@photobucket.com',
        ip_address: '50.161.172.212',
    },
    {
        id: 84,
        first_name: 'Zaria',
        last_name: 'Corbridge',
        email: 'zcorbridge2b@reference.com',
        ip_address: '244.50.167.81',
    },
    {
        id: 85,
        first_name: 'Barbara',
        last_name: 'Hartless',
        email: 'bhartless2c@ftc.gov',
        ip_address: '232.104.109.135',
    },
    {
        id: 86,
        first_name: 'Blair',
        last_name: 'Stebbings',
        email: 'bstebbings2d@blogspot.com',
        ip_address: '234.97.46.73',
    },
    {
        id: 87,
        first_name: 'Bertine',
        last_name: 'Eakeley',
        email: 'beakeley2e@narod.ru',
        ip_address: '44.180.111.106',
    },
    {
        id: 88,
        first_name: 'Byron',
        last_name: 'Schaben',
        email: 'bschaben2f@elpais.com',
        ip_address: '232.240.8.52',
    },
    {
        id: 89,
        first_name: 'Thurstan',
        last_name: 'Rown',
        email: 'trown2g@163.com',
        ip_address: '248.77.1.131',
    },
    {
        id: 90,
        first_name: 'Stavros',
        last_name: 'Scapelhorn',
        email: 'sscapelhorn2h@jiathis.com',
        ip_address: '95.213.144.65',
    },
    {
        id: 91,
        first_name: 'Mersey',
        last_name: 'Palmby',
        email: 'mpalmby2i@bloglines.com',
        ip_address: '200.185.199.124',
    },
    {
        id: 92,
        first_name: 'Edgardo',
        last_name: 'Pottie',
        email: 'epottie2j@mtv.com',
        ip_address: '100.46.51.53',
    },
    {
        id: 93,
        first_name: 'Sophia',
        last_name: 'Klimashevich',
        email: 'sklimashevich2k@cam.ac.uk',
        ip_address: '58.31.122.93',
    },
    {
        id: 94,
        first_name: 'Katerine',
        last_name: 'Krebs',
        email: 'kkrebs2l@desdev.cn',
        ip_address: '67.115.85.57',
    },
    {
        id: 95,
        first_name: 'Hadria',
        last_name: 'Chark',
        email: 'hchark2m@desdev.cn',
        ip_address: '126.4.52.12',
    },
    {
        id: 96,
        first_name: 'Anjela',
        last_name: 'Paslow',
        email: 'apaslow2n@vinaora.com',
        ip_address: '101.70.129.23',
    },
    {
        id: 97,
        first_name: 'Travis',
        last_name: 'Eates',
        email: 'teates2o@seattletimes.com',
        ip_address: '65.198.180.102',
    },
    {
        id: 98,
        first_name: 'Janina',
        last_name: 'MacDwyer',
        email: 'jmacdwyer2p@51.la',
        ip_address: '173.238.118.115',
    },
    {
        id: 99,
        first_name: 'Stanislas',
        last_name: 'Lambrick',
        email: 'slambrick2q@redcross.org',
        ip_address: '221.30.243.55',
    },
    {
        id: 100,
        first_name: 'Franny',
        last_name: 'Craw',
        email: 'fcraw2r@harvard.edu',
        ip_address: '90.176.79.69',
    },
];

export default {
    title: 'FDataGrid',
    component: FDataGrid,
};

export const Default = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid :columns="[]" />
        </div>
    `,
});

export const Columns = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                :columns="[
                    {
                        name: 'col1',
                        label: 'Column 1'
                    },
                    {
                        name: 'col2',
                        label: 'Column 2'
                    },
                ]"
            />
        </div>
    `,
});

export const Items = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                :columns="[
                    {
                        name: 'col1',  // this name will be used by default as a key in an item
                        label: 'Column 1'
                    },
                    {
                        name: 'col2',
                        label: 'Column 2',
                        itemProp: 'col.text', // this nested prop will be used as a key in an item
                    },
                ]"
                :items="[
                    {
                        col1: 'Row 1 - Col 1',
                        col: {
                            text: 'Row 1 - Col 2'
                        }
                    },
                    {
                        col1: 'Row 2 - Col 1',
                        col: {
                            text: 'Row 1 - Col 2'
                        }
                    },
                    {
                        col1: 'Row 3 - Col 1',
                        col: {
                            text: 'Row 1 - Col 2'
                        }
                    },
                    {
                        col1: 'Row 4 - Col 1',
                        col: {
                            text: 'Row 1 - Col 2'
                        }
                    },
                ]"
                :total-items="4"
                :per-page="3"
            />
        </div>
    `,
});

export const FooterItems = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                :footer-items="[{ ip_address: 'Footer text' }]"
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="5"
            />
        </div>
    `,
    data() {
        return {
            columns: clone(columns),
            items: clone(rows),
        };
    },
});

export const MobileViewBreakpoint = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                mobile-view-breakpoint="80em"
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="40"
            />
        </div>
    `,
    data() {
        return {
            columns: clone(columns),
            items: clone(rows),
        };
    },
});

export const Height = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                height="400px"
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="40"
            />
        </div>
    `,
    data() {
        return {
            columns: clone(columns),
            items: clone(rows),
        };
    },
});

export const MinHeight = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                min-height="400px"
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="4"
            />
            <hr />
        </div>
    `,
    data() {
        return {
            columns: clone(columns),
            items: clone(rows),
        };
    },
});

export const MaxHeight = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                max-height="400px"
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="40"
            />
        </div>
    `,
    data() {
        return {
            columns: clone(columns),
            items: clone(rows),
        };
    },
});

export const StickyHead = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                sticky-head
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="40"
            />
        </div>
    `,
    data() {
        return {
            columns: clone(columns),
            items: clone(rows),
        };
    },
});

export const StickyHeadAndHeight = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                sticky-head
                height="400px"
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="40"
            />
        </div>
    `,
    data() {
        return {
            columns: clone(columns),
            items: clone(rows),
        };
    },
});

export const StickyHeadAndMoreGridsOnAPage = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <h3>Grid 1</h3>
            <f-data-grid
                sticky-head
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="20"
            />

            <h3>Grid 2</h3>
            <f-data-grid
                sticky-head
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="20"
            />
        </div>
    `,
    data() {
        return {
            columns: clone(columns),
            items: clone(rows),
        };
    },
});

export const LessRowsThanPerPage = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="40"
            />
        </div>
    `,
    data() {
        return {
            columns: clone(columns),
            items: clone(rows.slice(0, 20)),
        };
    },
});

export const OneLineMode = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                one-line-mode
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="40"
            />
            <hr />
        </div>
    `,
    data() {
        return {
            columns: clone(columns),
            items: clone(rows),
        };
    },
});

export const NoPagination = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                :use-pagination="false"
                :columns="columns"
                :items="items"
            />
        </div>
    `,
    data() {
        return {
            columns: clone(columns),
            items: clone(rows),
        };
    },
});

export const NoHeader = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                no-header
                :use-pagination="false"
                :columns="columns"
                :items="items"
            />
        </div>
    `,
    data() {
        return {
            columns: clone(columns),
            items: clone(rows),
        };
    },
});

export const DataFormatting = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="40"
                sticky-head
            />
        </div>
    `,
    computed: {
        columns() {
            const cols = clone(columns);

            cols[1].formatter = function(value) {
                return value.toUpperCase();
            };

            cols[2].label = 'Full Name';
            cols[2].formatter = function(value, item) {
                return `${item.first_name} ${value}`;
            };

            return cols;
        },
    },
    data() {
        return {
            items: clone(rows),
        };
    },
});

export const DataFormattingWithColumnSlots = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="40"
                sticky-head
            >
                <template #column-first_name="{ value, item }">
                    <b class="fos-6">{{ value }}</b> <span class="fos-4">{{ item.last_name }}</span>
                </template>

                <template #column-email="{ value }">
                    <span class="flex gap-2 co-orange-7"><span class="fos-6">&#x2709;</span> {{ value }}</span>
                </template>
            </f-data-grid>
        </div>
    `,
    data() {
        return {
            columns: clone(columns),
            items: clone(rows),
        };
    },
});

export const RowStyle = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="40"
                sticky-head
            />
        </div>
    `,
    computed: {
        items() {
            const data = clone(rows);

            data[0].css = { color: 'magenta', '--fdatagrid-cell-background-color': '#eee' };
            data[1].cssClass = 'row-class';

            return data;
        },
    },
    data() {
        return {
            columns: clone(columns),
        };
    },
});

export const ColumnStyle = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="40"
                sticky-head
            />
        </div>
    `,
    computed: {
        columns() {
            const cols = clone(columns);

            cols[0].css = { color: 'rgba(0,0,0,0.4)' };
            cols[1].cssClass = 'col-class';
            cols[3].css = { fontStyle: 'italic' };
            cols[4].css = { textAlign: 'end', backgroundColor: '#eee' };

            return cols;
        },
    },
    data() {
        return {
            items: clone(rows),
        };
    },
});

export const HiddenColumns = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="40"
                sticky-head
            />
        </div>
    `,
    computed: {
        columns() {
            const cols = clone(columns);

            cols[0].hidden = true;
            cols[1].hidden = true;

            return cols;
        },
    },
    data() {
        return {
            items: clone(rows),
        };
    },
});

export const OneLineModeColumn = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="40"
                sticky-head
            />
        </div>
    `,
    computed: {
        columns() {
            const cols = clone(columns);

            cols[2].oneLineMode = true;

            return cols;
        },
    },
    data() {
        return {
            items: clone(rows),
        };
    },
});

export const ColumnMinWidth = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="40"
                sticky-head
            />
        </div>
    `,
    computed: {
        columns() {
            const cols = clone(columns);

            cols[0].width = '60px';
            cols[2].width = '400px';

            return cols;
        },
    },
    data() {
        return {
            items: clone(rows),
        };
    },
});

export const LocalSorting = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="20"
                min-height="400px"
                sticky-head
            />
        </div>
    `,
    computed: {
        columns() {
            const cols = clone(columns);

            cols[1].sortFunc = compareLocalizedStringProperty;
            cols[1].sortDir = 'desc';

            cols[2].sortFunc = compareLocalizedStringProperty;
            cols[3].sortFunc = compareLocalizedStringProperty;

            return cols;
        },
    },
    data() {
        return {
            items: clone(rows),
        };
    },
});

export const LocalFiltering = () => ({
    components: { FDataGrid, FFilters, FFormInput },
    template: `
        <div>
            <f-data-grid
                use-filters
                @change="onChange"
                :columns="columns"
                :items="dItems"
                :total-items="totalItems"
                :per-page="20"
                min-height="400px"
                sticky-head
           >
                <template #header>
                    <f-filters>
                        <f-form-input type="f-search-field" name="search" :throttle-input-interval="200" aria-label="search" />
                    </f-filters>
                </template>
            </f-data-grid>
        </div>
    `,
    data() {
        return {
            items: clone(rows),
            dItems: [],
            searchColumns: ['first_name', 'last_name', 'email', 'ip_address'],
        };
    },
    computed: {
        totalItems() {
            return this.dItems.length;
        },
        columns() {
            const cols = clone(columns);

            cols[1].sortFunc = compareLocalizedStringProperty;
            cols[2].sortFunc = compareLocalizedStringProperty;
            cols[3].sortFunc = compareLocalizedStringProperty;

            return cols;
        },
    },
    created() {
        this.dItems = this.items;
    },
    methods: {
        onChange(event) {
            if (event.type === 'filters') {
                let searchText = event.filters.values.search || '';
                const { searchColumns } = this;

                if (!searchText) {
                    this.dItems = this.items;
                } else {
                    searchText = searchText.trim().toLowerCase();

                    this.dItems = this.items.filter(
                        item => !!searchColumns.find(col => item[col].toLowerCase().indexOf(searchText) > -1)
                    );
                }
            }
        },
    },
});

export const OnChangeEvent = () => ({
    components: { FDataGrid, FFilters, FFormInput },
    template: `
        <div class="grid">
            <f-data-grid
                @change="onChange"
                use-filters
                :columns="columns"
                :items="dItems"
                :total-items="totalItems"
                :per-page="20"
                min-height="400px"
                class="md:col-9"
           >
                <template #header>
                    <f-filters>
                        <f-form-input type="f-search-field" name="search" :throttle-input-interval="200" aria-label="search" />
                    </f-filters>
                </template>
            </f-data-grid>
            <div class="md:col-3 tes-4 pat-3" style="overflow: auto">
                On Change Event:
                <pre>{{ onChangeEvent }}</pre>
            </div>
        </div>
    `,
    data() {
        return {
            items: clone(rows),
            dItems: [],
            searchColumns: ['first_name', 'last_name', 'email', 'ip_address'],
            onChangeEvent: {},
        };
    },
    computed: {
        totalItems() {
            return this.dItems.length;
        },
        columns() {
            const cols = clone(columns);

            cols[1].sortFunc = compareLocalizedStringProperty;
            cols[2].sortFunc = compareLocalizedStringProperty;
            cols[3].sortFunc = compareLocalizedStringProperty;

            return cols;
        },
    },
    created() {
        this.dItems = this.items;
    },
    methods: {
        onChange(event) {
            this.onChangeEvent = event;

            if (event.type === 'filters') {
                let searchText = event.filters.values.search || '';
                const { searchColumns } = this;

                if (!searchText) {
                    this.dItems = this.items;
                } else {
                    searchText = searchText.trim().toLowerCase();

                    this.dItems = this.items.filter(
                        item => !!searchColumns.find(col => item[col].toLowerCase().indexOf(searchText) > -1)
                    );
                }
            }
        },
    },
});

export const Loading = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                loading
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="40"
            />
        </div>
    `,
    data() {
        return {
            columns: clone(columns),
            items: clone(rows),
        };
    },
});

export const RemoteDataPaginatingSortingFiltering = () => ({
    components: { FDataGrid, FFilters, FFormInput },
    template: `
        <div>
            <f-data-grid
                strategy="remote"
                @change="onChange"
                use-filters
                :columns="columns"
                :items="items"
                :total-items="totalItems"
                :per-page="perPage"
                sticky-head
            >
                <template #header>
                    <f-filters>
                        <f-form-input type="f-search-field" name="search" :throttle-input-interval="200" aria-label="search" />
                    </f-filters>
                </template>
            </f-data-grid>
        </div>
    `,
    data() {
        return {
            items: [],
            perPage: 40,
            totalItems: 0,
            searchColumns: ['first_name', 'last_name', 'email', 'ip_address'],
        };
    },
    computed: {
        columns() {
            const cols = clone(columns);

            cols[1].sortable = true;
            cols[2].sortable = true;
            cols[3].sortable = true;

            return cols;
        },
    },
    created() {
        this.items = this.fetchItems();
    },
    methods: {
        async fetchItems(event) {
            const data = await this.fetchPagedRows(event);

            this.totalItems = data.totalItems;

            return data.rows;
        },

        onChange(event) {
            this.items = this.fetchItems(event);
        },

        /**
         * Faking a request to a server...
         */
        fetchPagedRows({
            currPage = 1,
            perPage = this.perPage,
            sortBy = '',
            sortDir = 'desc',
            filters,
            timeout = 1000,
        } = {}) {
            return new Promise(resolve =>
                setTimeout(() => {
                    let data = clone(rows);

                    if (filters) {
                        let searchText = (filters.values.search || '').trim();
                        const { searchColumns } = this;

                        if (searchText) {
                            searchText = searchText.toLowerCase();

                            data = data.filter(
                                item => !!searchColumns.find(col => item[col].toLowerCase().indexOf(searchText) > -1)
                            );
                        }
                    }

                    if (sortBy) {
                        data.sort(compareLocalizedStringProperty(sortBy, sortDir));
                    }

                    resolve({
                        totalItems: data.length,
                        rows: data.slice((currPage - 1) * perPage, currPage * perPage),
                    });
                }, timeout)
            );
        },
    },
});

export const InfiniteScroll = () => ({
    components: { FDataGrid, FFilters, FFormInput },
    template: `
        <div>
            <f-data-grid
                infinite-scroll
                strategy="remote"
                @change="onChange"
                use-filters
                :columns="columns"
                :items="items"
                :total-items="totalItems"
                :per-page="perPage"
                sticky-head
            >
                <template #header>
                    <f-filters>
                        <f-form-input type="f-search-field" name="search" :throttle-input-interval="200" aria-label="search" />
                    </f-filters>
                </template>
            </f-data-grid>
        </div>
    `,
    data() {
        return {
            items: [],
            perPage: 25,
            totalItems: 0,
            searchColumns: ['first_name', 'last_name', 'email', 'ip_address'],
        };
    },
    computed: {
        columns() {
            const cols = clone(columns);

            cols[1].sortable = true;
            cols[2].sortable = true;
            cols[3].sortable = true;

            return cols;
        },
    },
    created() {
        this.items = this.fetchItems();
    },
    methods: {
        async fetchItems(event) {
            const data = await this.fetchPagedRows(event);

            this.totalItems = data.totalItems;

            return data.rows;
        },

        onChange(event) {
            this.items = this.fetchItems(event);
        },

        /**
         * Faking a request to a server...
         */
        fetchPagedRows({
            currPage = 1,
            perPage = this.perPage,
            sortBy = '',
            sortDir = 'desc',
            filters,
            timeout = 1000,
        } = {}) {
            return new Promise(resolve =>
                setTimeout(() => {
                    let data = clone(rows);

                    if (filters) {
                        let searchText = (filters.values.search || '').trim();
                        const { searchColumns } = this;

                        if (searchText) {
                            searchText = searchText.toLowerCase();

                            data = data.filter(
                                item => !!searchColumns.find(col => item[col].toLowerCase().indexOf(searchText) > -1)
                            );
                        }
                    }

                    if (sortBy) {
                        data.sort(compareLocalizedStringProperty(sortBy, sortDir));
                    }

                    resolve({
                        totalItems: data.length,
                        rows: data.slice((currPage - 1) * perPage, currPage * perPage),
                    });
                }, timeout)
            );
        },
    },
});

export const EditModeRow = () => ({
    components: { FDataGrid, FInput, FComboBox, FOption },
    template: `
        <div class="grid">
            <div class="md:col-9">
                <f-data-grid
                    edit-mode="row"
                    v-model="items"
                    :columns="columns"
                    :empty-row-values="emptyRowValues"
                    :footer-items="footerItems"
                    :use-pagination="false"
                    no-header
                >
                    <template #editor-textinput="{ item }">
                        <f-input v-model="item.textinput" no-label />
                    </template>
                    <template #editor-numberinput="{ item }">
                        <f-input
                            v-model="item.numberinput"
                            type="number"
                            no-label
                            :validator="numberValidator"
                            :auto-correction="0"
                            error-messages-component="f-error-messages-popover"
                            validate-on-input
                        />
                    </template>
                    <template #editor-textarea="{ item }">
                        <f-input is-textarea auto-resizable-textarea v-model="item.textarea" no-label />
                    </template>
                    <template #editor-combobox="{ item }">
                        <f-combo-box select-mode :data="comboboxEditorData" v-model="item.combobox" no-label />
                    </template>
                    <template #editor-checkbox="{ item }">
                        <f-option type="checkbox" v-model="item.checkbox" />
                    </template>
                    <template #footercolumn-numberinput="{ item, value }">
                        Sum: <b>{{ value }}</b>
                    </template>
                </f-data-grid>
            </div>
            <div class="md:col-3 tes-4 pat-3" style="overflow: auto">
                items:
                <pre>{{ items }}</pre>
            </div>
        </div>
    `,
    data() {
        return {
            columns: [
                {
                    name: 'textinput',
                    label: 'Text Input',
                    editable: true,
                },
                {
                    name: 'numberinput',
                    label: 'Number Input',
                    editable: true,
                },
                {
                    name: 'textarea',
                    label: 'Textarea',
                    editable: true,
                    // hidden: true,
                },
                {
                    name: 'combobox',
                    label: 'ComboBox',
                    editable: true,
                    defaultValue: 1,
                    formatter: value => {
                        return this.comboboxFormatter(value, this.comboboxEditorData);
                    },
                },
                {
                    name: 'checkbox',
                    label: 'Checkbox',
                    editable: true,
                    defaultValue: false,
                    // hidden: true,
                },
            ],
            items: [
                {
                    id: 1,
                    textinput: 'Justine',
                    numberinput: 0,
                    textarea: 'Morbi sem mauris, laoreet ut',
                    combobox: 1,
                    checkbox: false,
                },
                {
                    id: 2,
                    textinput: '',
                    numberinput: 0,
                    textarea: 'rhoncus aliquet, pulvinar sed',
                    combobox: 1,
                    checkbox: false,
                },
            ],
            comboboxEditorData: [
                {
                    value: 1,
                    label: 'Option 1',
                },
                {
                    value: 2,
                    label: 'Option 2',
                },
            ],
        };
    },
    computed: {
        footerItems() {
            const { items } = this;

            return [
                {
                    numberinput: items.reduce((prev, curr) => {
                        const val = parseInt(curr.numberinput);

                        return prev + (!this.numberValidator(val) ? val : 0);
                    }, 0),
                },
            ];
        },
    },
    methods: {
        emptyRowValues() {
            return {
                id: null,
                textinput: '',
                numberinput: 0,
                textarea: '',
                combobox: 1,
                checkbox: false,
            };
        },
        numberValidator(value) {
            const val = parseInt(value);

            if (isNaN(val)) {
                return 'Not a number';
            } else if (value < 0) {
                return 'Must be a positive number';
            }

            return '';
        },
        comboboxFormatter(value, data) {
            const option = data.find(item => item.value === value);

            return option ? option.label : '';
        },
    },
});

export const EditModeRowEdit = () => ({
    components: { FDataGrid, FInput, FComboBox, FOption },
    template: `
        <div class="grid">
            <div class="md:col-9">
                <f-data-grid
                    edit-mode="row-edit"
                    v-model="items"
                    :columns="columns"
                    :empty-row-values="emptyRowValues"
                    :footer-items="footerItems"
                    :use-pagination="false"
                    no-header
                >
                    <template #editor-textinput="{ item }">
                        <f-input v-model="item.textinput" no-label />
                    </template>
                    <template #editor-numberinput="{ item }">
                        <f-input
                            v-model="item.numberinput"
                            type="number"
                            no-label
                            :validator="numberValidator"
                            :auto-correction="0"
                            error-messages-component="f-error-messages-popover"
                            validate-on-input
                        />
                    </template>
                    <template #editor-textarea="{ item }">
                        <f-input is-textarea auto-resizable-textarea v-model="item.textarea" no-label />
                    </template>
                    <template #editor-combobox="{ item }">
                        <f-combo-box select-mode :data="comboboxEditorData" v-model="item.combobox" no-label />
                    </template>
                    <template #editor-checkbox="{ item }">
                        <f-option type="checkbox" v-model="item.checkbox" />
                    </template>
                    <template #footercolumn-numberinput="{ item, value }">
                        Sum: <b>{{ value }}</b>
                    </template>
                </f-data-grid>
            </div>
            <div class="md:col-3 tes-4 pat-3" style="overflow: auto">
                items:
                <pre>{{ items }}</pre>
            </div>
        </div>
    `,
    data() {
        return {
            columns: [
                {
                    name: 'textinput',
                    label: 'Text Input',
                    editable: true,
                },
                {
                    name: 'numberinput',
                    label: 'Number Input',
                    editable: true,
                },
                {
                    name: 'textarea',
                    label: 'Textarea',
                    editable: true,
                    // hidden: true,
                },
                {
                    name: 'combobox',
                    label: 'ComboBox',
                    editable: true,
                    defaultValue: 1,
                    formatter: value => {
                        return this.comboboxFormatter(value, this.comboboxEditorData);
                    },
                },
                {
                    name: 'checkbox',
                    label: 'Checkbox',
                    editable: true,
                    defaultValue: false,
                    // hidden: true,
                },
            ],
            items: [
                {
                    id: 1,
                    textinput: 'Justine',
                    numberinput: 0,
                    textarea: 'Morbi sem mauris, laoreet ut',
                    combobox: 1,
                    checkbox: false,
                },
                {
                    id: 2,
                    textinput: '',
                    numberinput: 0,
                    textarea: 'rhoncus aliquet, pulvinar sed',
                    combobox: 1,
                    checkbox: false,
                },
            ],
            comboboxEditorData: [
                {
                    value: 1,
                    label: 'Option 1',
                },
                {
                    value: 2,
                    label: 'Option 2',
                },
            ],
        };
    },
    computed: {
        footerItems() {
            const { items } = this;

            return [
                {
                    numberinput: items.reduce((prev, curr) => {
                        const val = parseInt(curr.numberinput);

                        return prev + (!this.numberValidator(val) ? val : 0);
                    }, 0),
                },
            ];
        },
    },
    methods: {
        emptyRowValues() {
            return {
                id: null,
                textinput: '',
                numberinput: 0,
                textarea: '',
                combobox: 1,
                checkbox: false,
            };
        },
        numberValidator(value) {
            const val = parseInt(value);

            if (isNaN(val)) {
                return 'Not a number';
            } else if (value < 0) {
                return 'Must be a positive number';
            }

            return '';
        },
        comboboxFormatter(value, data) {
            const option = data.find(item => item.value === value);

            return option ? option.label : '';
        },
    },
});

/*
export const LoaderDelay = () => ({
    components: { FDataGrid },
    template: `
        <div>
            <f-data-grid
                :columns="columns"
                :items="items"
                :total-items="items.length"
                :per-page="40"
                loading
                :loader-delay="1000"
            />
        </div>
    `,
    data() {
        return {
            columns: clone(columns),
            items: clone(rows),
        };
    },
});
*/
