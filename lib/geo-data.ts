

export interface Upazila {
    upazila: string
    unions: string[]
}
export interface District {
    district: string
    upazilas: Upazila[]
}

export interface Division {
    division: string
    districts: District[]
}

export const bangladeshGeoData: Division[] =
    [

        {
            "division": "Barishal",
            "districts": [
                {
                    "district": "Barguna",
                    "upazilas": [
                        {
                            "upazila": "Amtali",
                            "unions": ["Amtali", "Arpangashia", "Chowra", "Gulishakhali", "Haldia", "Kukua", "Nishanbaria", "Pancha Koralia", "Paurashava", "Sarikkhali"]
                        },
                        {
                            "upazila": "Bamna",
                            "unions": ["Bamna", "Bukabunia", "Dauatala", "Ramna"]
                        },
                        {
                            "upazila": "Barguna Sadar",
                            "unions": ["Badarkhali", "Barguna", "Bibichini", "Burir Char", "Dhalua", "Gaurichanna", "Keorabunia", "M.Bali", "Naltona", "Paurashava"]
                        },
                        {
                            "upazila": "Betagi",
                            "unions": ["Betagi", "Bibichini", "Hosnabad", "Mokamia", "Paurashava"]
                        },
                        {
                            "upazila": "Patharghata",
                            "unions": ["Kakchira", "Kalmegha", "Kanthaltali", "Nachna Mohal", "Patharghata", "Raihanpur"]
                        },
                        {
                            "upazila": "Taltali",
                            "unions": ["Sarikkhali", "Sonakata", "Taltali"]
                        }
                    ]
                },
                {
                    "district": "Barishal",
                    "upazilas": [
                        {
                            "upazila": "Agailjhara",
                            "unions": ["Gaila", "Paisarhat", "Rajiher", "Ratasur", "Saturia"]
                        },
                        {
                            "upazila": "Babuganj",
                            "unions": ["Agarpur", "Chandpasha", "Dehergati", "Kedarpur", "Madhabpasha", "Rahmatpur"]
                        },
                        {
                            "upazila": "Bakerganj",
                            "unions": ["Bharakhada", "Charamandi", "Darial", "Dudhal", "Durgapur", "Faridpur", "Gardi", "Kabai", "Kalaskati", "Niamati", "Padri Shibpur", "Paurashava"]
                        },
                        {
                            "upazila": "Banaripara",
                            "unions": ["Baisari", "Banaripara", "Barthi", "Chakhar", "Kaderpur", "Sahebpur"]
                        },
                        {
                            "upazila": "Barishal Sadar",
                            "unions": ["Chandpur", "Charpura", "Chormonai", "Kashipur", "Roypasha", "Shayestabad", "Tungibaria", "Paurashava"]
                        },
                        {
                            "upazila": "Gournadi",
                            "unions": ["Batajore", "Gournadi", "Khanjapur", "Mahilara", "Nalchira", "Paurashava"]
                        },
                        {
                            "upazila": "Hizla",
                            "unions": ["Dhulkhola", "Guabaria", "Harinathpur", "Hizla Gaurabdi", "Memania"]
                        },
                        {
                            "upazila": "Mehendiganj",
                            "unions": ["Alimabad", "Andhar Manik", "Biddanandapur", "Chandpur", "Char Gopalpur", "Dari Char Khajuria", "Gobindapur", "Jangalia", "Lata", "Mehendiganj", "Paurashava", "Ulania"]
                        },
                        {
                            "upazila": "Muladi",
                            "unions": ["Gazaria", "Harinathpur", "Kazirchar", "Muladi", "Paurashava", "Safipur"]
                        },
                        {
                            "upazila": "Wazirpur",
                            "unions": ["Bamrail", "Bara Jalia", "Guthia", "Harta", "Jalla", "Otra", "Satla", "Shikarpur", "Paurashava"]
                        }
                    ]
                },
                {
                    "district": "Bhola",
                    "upazilas": [
                        {
                            "upazila": "Bhola Sadar",
                            "unions": ["Alinagor", "Bapta", "Dakshin Dighaldi", "Daurihat", "Kachia", "Paurashava", "Uttar Dighaldi"]
                        },
                        {
                            "upazila": "Burhanuddin",
                            "unions": ["Bara Malancha", "Deula", "Gangapur", "Hassan Nagar", "Kachia", "Kutba", "Pakshia", "Paurashava"]
                        },
                        {
                            "upazila": "Char Fasson",
                            "unions": ["Abdullapur", "Abu Bakarpur", "Adam Ali", "Aminabad", "Char Fasson", "Dakshin Mohammadpur", "Dakshin Rajapur", "Osmanganj", "Paurashava", "Uttar Mohammadpur"]
                        },
                        {
                            "upazila": "Daulatkhan",
                            "unions": ["Bhabanipur", "Char Khalifa", "Dakshin Joynagar", "Hajipur", "Madanpur", "Paurashava", "Uttar Joynagar"]
                        },
                        {
                            "upazila": "Lalmohan",
                            "unions": ["Char Martin", "Dhali Gaurnagar", "Farazganj", "Kalma", "Lalmohan", "Lord Hardinge", "Paurashava", "Ramaganj"]
                        },
                        {
                            "upazila": "Manpura",
                            "unions": ["Dakshin Sakuchia", "Hajirhat", "Manpura", "Uttar Sakuchia"]
                        },
                        {
                            "upazila": "Tazumuddin",
                            "unions": ["Chanchra", "Charmadraj", "Charmanika", "Shibpur", "Sonapur", "Tazumuddin"]
                        }
                    ]
                },
                {
                    "district": "Jhalokathi",
                    "upazilas": [
                        {
                            "upazila": "Jhalokathi Sadar",
                            "unions": ["Basanda", "Binoykati", "Gabha Ramchandrapur", "Keora", "Kusanghal", "Nabagram", "Paurashava", "Shekherhat"]
                        },
                        {
                            "upazila": "Kathalia",
                            "unions": ["Jhalia", "Kathalia", "Mollahat", "Nalchity", "Paurashava", "Ranapasha", "Saturia"]
                        },
                        {
                            "upazila": "Nalchity",
                            "unions": ["Bharabpasha", "Dapdapia", "Kulkati", "Kusanghal", "Magar", "Paurashava", "Rahmatpur", "Shoulajalia"]
                        },
                        {
                            "upazila": "Rajapur",
                            "unions": ["Baraia", "Dakshin Sugandhia", "Dhanisafa", "Kachua", "Maruwa", "Paurashava", "Rajapur", "Suktagarh", "Uttar Sugandhia"]
                        }
                    ]
                },
                {
                    "district": "Patuakhali",
                    "upazilas": [
                        {
                            "upazila": "Bauphal",
                            "unions": ["Adabaria", "Baga", "Bauphal", "Daspara", "Dhulia", "Kalisuri", "Kanakdia", "Nazirpur", "Nurania", "Paurashava"]
                        },
                        {
                            "upazila": "Dashmina",
                            "unions": ["Alipur", "Dashmina", "Rangopaldi", "Tentulbaria"]
                        },
                        {
                            "upazila": "Dumki",
                            "unions": ["Angaria", "Lebukhali", "Muradia", "Pangasia"]
                        },
                        {
                            "upazila": "Galachipa",
                            "unions": ["Amkhola", "Chiknikandi", "Dakua", "Galachipa", "Gazalia", "Golkhali", "Kalagachhia", "Panpatty", "Ratadi Taltali"]
                        },
                        {
                            "upazila": "Kalapara",
                            "unions": ["Chakamaiya", "Dalbuganj", "Dhankhali", "Kalapara", "Lalua", "Latachapli", "Mazherchar", "Nilganj"]
                        },
                        {
                            "upazila": "Mirzaganj",
                            "unions": ["Amragachhia", "Deuli Subidkhali", "Karipara", "Mirzaganj", "Majidbaria", "Tona"]
                        },
                        {
                            "upazila": "Patuakhali Sadar",
                            "unions": ["Auliapur", "Badarpur", "Chhota Bighai", "Itbaria", "Jainkati", "Kalikapur", "Laukathi", "Lohalia", "Madarbunia", "Marichbunia", "Paurashava"]
                        },
                        {
                            "upazila": "Rangabali",
                            "unions": ["Barabagi", "Chalitabunia", "Char Montaz", "Rangabali"]
                        }
                    ]
                },
                {
                    "district": "Pirojpur",
                    "upazilas": [
                        {
                            "upazila": "Bhandaria",
                            "unions": ["Bhandaria", "Dhaoa", "Gauripur", "Jolagati", "Kaurikhara", "Kanthaltali", "Kanya", "Kaukhali", "Paurashava"]
                        },
                        {
                            "upazila": "Kaukhali",
                            "unions": ["Amrajuri", "Chirapara", "Daudkhali", "Dhanisafa", "Kaukhali", "Keundia", "Magar", "Paurashava", "Sarenga"]
                        },
                        {
                            "upazila": "Mathbaria",
                            "unions": ["Amragachhia", "Bara Bagi", "Betmore Rajapur", "Dhanisafa", "Dosh Ghashi", "Karapara", "Mathbaria", "Paurashava", "Tikikata"]
                        },
                        {
                            "upazila": "Nazirpur",
                            "unions": ["Dariapur", "Dudhal", "Gauripur", "Jolagati", "Nazirpur", "Paurashava", "Sekhmatia"]
                        },
                        {
                            "upazila": "Nesarabad",
                            "unions": ["Atghar Kuriana", "Bali Para", "Dattapara", "Doshpara", "Guarekha", "Nesarabad", "Paurashava", "Sohagdal"]
                        },
                        {
                            "upazila": "Pirojpur Sadar",
                            "unions": ["Daudkhali", "Dhanisafa", "Kaurikhara", "Khandar", "Paurashava", "Swarupkathi", "Tona"]
                        },
                        {
                            "upazila": "Zianagar",
                            "unions": ["Bara Ghati", "Parerhat", "Sriramkathi", "Zianagar"]
                        }
                    ]
                }
            ]
        },
       {
            "division": "Chattogram",
            "districts": [
                {
                    "district": "Bandarban",
                    "upazilas": [
                        {
                            "upazila": "Bandarban Sadar",
                            "unions": ["Bandarban Sadar", "Kuhalong", "Rajbila", "Suwalak", "Tankabati"]
                        },
                        {
                            "upazila": "Ali Kadam",
                            "unions": ["Ali Kadam", "Bara Thanchi", "Chhengeri", "Kotana", "Pura Para"]
                        },
                        {
                            "upazila": "Rowangchhari",
                            "unions": ["Rowangchhari", "Alikhyong", "Ghilachhari", "Nowa Patang", "Tarachha"]
                        },
                        {
                            "upazila": "Ruma",
                            "unions": ["Ruma", "Ghalangya", "Paindu", "Pandang", "Remakri", "Sarai"]
                        },
                        {
                            "upazila": "Thanchi",
                            "unions": ["Thanchi", "Balipara", "Remakri", "Tindong"]
                        },
                        {
                            "upazila": "Naikhongchhari",
                            "unions": ["Naikhongchhari", "Baishari", "Dochhari", "Ghandung", "Naikhongchhari"]
                        },
                        {
                            "upazila": "Lama",
                            "unions": ["Lama", "Aziznagar", "Faitang", "Fasyakhali", "Gajalia", "Lama", "Rupushipara", "Sarai"]
                        }
                    ]
                },
                {
                    "district": "Brahmanbaria",
                    "upazilas": [
                        {
                            "upazila": "Brahmanbaria Sadar",
                            "unions": ["Brahmanbaria Sadar", "Bishnupur", "Bhadughar", "Chandura", "Dakshin Natai", "Uttar Natai"]
                        },
                        {
                            "upazila": "Ashuganj",
                            "unions": ["Ashuganj", "Araisidha", "Char Chartala", "Durgapur", "Lalpur", "Shahbazpur"]
                        },
                        {
                            "upazila": "Bancharampur",
                            "unions": ["Bancharampur", "Dhar Mandal", "Fandauk", "Pahariakandi", "Rupasdi", "Sreenagar"]
                        },
                        {
                            "upazila": "Bijoynagar",
                            "unions": ["Bijoynagar", "Bishnupur", "Brahmanbaria", "Champaknagar", "Poun", "Shahjadal"]
                        },
                        {
                            "upazila": "Kasba",
                            "unions": ["Kasba", "Chandpur", "Charsi", "Kuti", "Machhihata", "Mokara", "Tali"]
                        },
                        {
                            "upazila": "Nabinagar",
                            "unions": ["Nabinagar", "Barail", "Bibiyana", "Gopinathpur", "Inatganj", "Laur Fatehpur", "Rasullabad", "Shahapur"]
                        },
                        {
                            "upazila": "Nasirnagar",
                            "unions": ["Nasirnagar", "Burishwar", "Gokarna", "Haripur", "Kharera", "Purbabhag", "Sreemangal"]
                        },
                        {
                            "upazila": "Sarail",
                            "unions": ["Sarail", "Ashuganj", "Chhoysuti", "Noapara", "Shahbazpur", "Shahjadapur"]
                        },
                        {
                            "upazila": "Shahbazpur",
                            "unions": ["Shahbazpur", "Char Abdullah", "Char Algi", "Char Ishwardia", "Char King", "Char Poragacha"]
                        }
                    ]
                },
                {
                    "district": "Chandpur",
                    "upazilas": [
                        {
                            "upazila": "Chandpur Sadar",
                            "unions": ["Chandpur Sadar", "Baghadi", "Kalyanpur", "Purba Chandpur", "Purbabagh", "Shah Mahmudpur"]
                        },
                        {
                            "upazila": "Faridganj",
                            "unions": ["Faridganj", "Dakshin Faridganj", "Paschim Faridganj", "Paschim Char Dukhia", "Paschim Char Matlab", "Purba Char Dukhia", "Purba Char Matlab"]
                        },
                        {
                            "upazila": "Haimchar",
                            "unions": ["Haimchar", "Char Bhairabi", "Char Lord", "Haimchar", "Nilkamal"]
                        },
                        {
                            "upazila": "Hajiganj",
                            "unions": ["Hajiganj", "Bakila", "Dakshin Hajiganj", "Hatila", "Paschim Hajiganj", "Purba Hajiganj"]
                        },
                        {
                            "upazila": "Kachua",
                            "unions": ["Kachua", "Ashrafpur", "Dakshin Kachua", "Paschim Kachua", "Purba Kachua", "Sachar"]
                        },
                        {
                            "upazila": "Matlab Uttar",
                            "unions": ["Matlab Uttar", "Dakhshin Matlab", "Matlab Paschim", "Matlab Purba", "Uttar Matlab"]
                        },
                        {
                            "upazila": "Matlab Dakshin",
                            "unions": ["Matlab Dakshin", "Char Amanullah", "Dakhshin Matlab", "Matlab Paschim", "Matlab Purba"]
                        },
                        {
                            "upazila": "Shahrasti",
                            "unions": ["Shahrasti", "Dakshin Shahrasti", "Paschim Shahrasti", "Purba Shahrasti", "Uttar Shahrasti"]
                        }
                    ]
                },
                {
                    "district": "Chattogram",
                    "upazilas": [
                        {
                            "upazila": "Chattogram Sadar",
                            "unions": ["Chattogram Sadar", "Al- Amin Baria Madarsa", "Badyarhat", "Bayazid", "Hathazari", "Kotwali", "Pahartali", "Panchlaish", "Patenga"]
                        },
                        {
                            "upazila": "Anwara",
                            "unions": ["Anwara", "Baitul Ijjat", "Barasat", "Chatari", "Paraikora", "Sahapur"]
                        },
                        {
                            "upazila": "Banshkhali",
                            "unions": ["Banshkhali", "Gandamara", "Joara", "Katharia", "Khankhanabad", "Puichhari", "Saharbil", "Saral"]
                        },
                        {
                            "upazila": "Boalkhali",
                            "unions": ["Boalkhali", "Ahla Karaldanga", "Amirabad", "Charandwip", "Kandhurkhil", "Sakpura", "Saroatali"]
                        },
                        {
                            "upazila": "Chandanaish",
                            "unions": ["Chandanaish", "Bailchhari", "Barama", "Dohazari", "Kharana", "Puranagar", "Satbaria"]
                        },
                        {
                            "upazila": "Fatikchhari",
                            "unions": ["Fatikchhari", "Abdullapur", "Dantmara", "Harualchhari", "Jafarnagar", "Kanchannagar", "Narayanhat"]
                        },
                        {
                            "upazila": "Hathazari",
                            "unions": ["Hathazari", "Chittagong University", "Fatehpur", "Garduara", "Guman Mardan", "Hathazari", "Katirhat", "Madarsa", "Yunus Nagar"]
                        },
                        {
                            "upazila": "Lohagara",
                            "unions": ["Lohagara", "Adhunagar", "Chunati", "Kalauzan", "Lohagara", "Padua", "Putibila"]
                        },
                        {
                            "upazila": "Mirsharai",
                            "unions": ["Mirsharai", "Baroidhala", "Dhum", "Durgapur", "Haitkandi", "Hinguli", "Jorarganj", "Kharera", "Mithanala", "Osmanpur", "Saherkhali", "Wahedpur"]
                        },
                        {
                            "upazila": "Patiya",
                            "unions": ["Patiya", "Bara Uthan", "Bhatikhain", "Char Lakshya", "Dakshin Madarsa", "Jaldi", "Kanchana", "Khagaria", "Loghu", "Sikalbaha"]
                        },
                        {
                            "upazila": "Rangunia",
                            "unions": ["Rangunia", "Bharawazhat", "Chandraghona", "Hosnabad", "Kodala", "Lalanagar", "Mariamnagar", "Padua", "Parua", "Pomra", "Rajapatthar"]
                        },
                        {
                            "upazila": "Raozan",
                            "unions": ["Raozan", "Bagoan", "Binajuri", "Chikandandi", "Dabua", "Eochia", "Gahira", "Haladia", "Kodurkhil", "Noapara", "Pahartali", "Urkirchar"]
                        },
                        {
                            "upazila": "Sandwip",
                            "unions": ["Sandwip", "Amanullah", "Azimpur", "Bauria", "Gachhua", "Kalapania", "Magdhara", "Maitbhanga", "Musapur", "Rahmatpur", "Santoshpur"]
                        },
                        {
                            "upazila": "Satkania",
                            "unions": ["Satkania", "Baitul Falah", "Bazalia", "Charati", "Dhemsa", "Kaliais", "Khagaria", "Satkania", "Sikarpur", "Tairkhil"]
                        },
                        {
                            "upazila": "Sitakunda",
                            "unions": ["Sitakunda", "Bansbaria", "Barabkunda", "Bariadyala", "Bhatiari", "Fouzdarhat", "Jafarnagar", "Kumira", "Maddhyam Bhatiari", "Muradpur", "Saidpur"]
                        }
                    ]
                },
                {
                    "district": "Cox's Bazar",
                    "upazilas": [
                        {
                            "upazila": "Chakaria",
                            "unions": ["Chakaria", "Badarkhali", "Baraitali", "Bheola Manikchar", "Dulahazara", "Fashiakhali", "Harbang", "Kakara", "Khuntakhali", "Konakhali", "Lakhyarchar", "Paschim Bara Bheola", "Purba Bara Bheola", "Saharbil"]
                        },
                        {
                            "upazila": "Cox's Bazar Sadar",
                            "unions": ["Cox's Bazar Sadar", "Chowfaldandi",
                                "Jhilongjha",
                                "Khurushkul",
                                "Raozan",
                                "Jalalabad",
                                "Maheshkhali"
                            ]
                        },

                        {
                            "upazila": "Eidgaon",
                            "unions": ["Eidgaon", "Eidgaon", "Islampur", "Jalalabad", "Pokkhali"]
                        },
                        {
                            "upazila": "Kutubdia",
                            "unions": ["Kutubdia", "Ali Akbar Deil", "Baraghop", "Kaiar Bil", "Lemsikhali", "Uttar Dhurung", "Uttar Shilkhali"]
                        },
                        {
                            "upazila": "Maheshkhali",
                            "unions": ["Maheshkhali", "Bara Maheshkhali", "Chota Maheshkhali", "Dhalghata", "Hoanak", "Kutubjom", "Matarbari", "Shaplapur"]
                        },
                        {
                            "upazila": "Ramu",
                            "unions": [
                                "Ramu",
                                "Chakmarkul",
                                "Dakshin Mithachhari",
                                "Fotekharkul",
                                "Garjania",
                                "Jambonia",
                                "Kachhapia",
                                "Kaurikhil",
                                "Khuniapalong",
                                "Rajar Khil",
                                "Rashid Nagar",
                                "Patali Machhuakhali",
                                "Varuakhali"
                            ]
                        },
                        {
                            "upazila": "Teknaf",
                            "unions": ["Teknaf", "Baharchhara", "Nhila", "Sabrang", "Saint Martin", "Teknaf", "Whykong"]
                        },
                        {
                            "upazila": "Ukhia",
                            "unions": ["Ukhia", "Haldia Palong", "Jalia Palong", "Raja Palong", "Ratna Palong", "Palong Khali"]
                        },
                        {
                            "upazila": "Pekua",
                            "unions": ["Pekua", "Baraghop", "Magnama", "Pekua", "Rajakhali", "Shilkhali", "Taitong"]
                        }
                    ]
                },
                {
                    "district": "Comilla",
                    "upazilas": [
                        {
                            "upazila": "Barura",
                            "unions": ["Barura", "Adda", "Baktapur", "Dakshin Khosbas", "Dakshin Shilmuri", "Deora", "Galimpur", "Jagannathpur", "Jalam", "Panchthubi", "Uttar Khosbas", "Uttar Shilmuri"]
                        },
                        {
                            "upazila": "Brahmanpara",
                            "unions": ["Brahmanpara", "Brahmanpara", "Chandla", "Shashidal", "Sidlai"]
                        },
                        {
                            "upazila": "Burichang",
                            "unions": ["Burichang", "Baksimail", "Bhani", "Mainamati", "Mokam", "Pir Jatrapur", "Rajapur", "Sholanal"]
                        },
                        {
                            "upazila": "Chandina",
                            "unions": ["Chandina", "Atbar Pur", "Bholain", "Chandina", "Doulatpur", "Gangamandal", "Joyag", "Mahichal", "Sultanpur"]
                        },
                        {
                            "upazila": "Chauddagram",
                            "unions": ["Chauddagram", "Alkara", "Batisa", "Cheora", "Gangamandal", "Kalikapur", "Kankapait", "Kasar", "Kherar", "Mudaffarganj", "Sreekail"]
                        },
                        {
                            "upazila": "Daudkandi",
                            "unions": ["Daudkandi", "Biteshwar", "Daudkandi", "Eliotganj", "Gouripur", "Maksudpur", "Maruka", "Mohammadpur Paschim", "Mohammadpur Purba", "Panchgachhia", "Ramchandrapur", "Sundalpur"]
                        },
                        {
                            "upazila": "Debidwar",
                            "unions": ["Debidwar", "Bara Shalghar", "Chandpur", "Dharampur", "Elahabad", "Fatehpur", "Jagannathpur", "Mohanpur", "Purbadhair", "Rajamehar", "Rasulpur", "Sonakanda", "Vani"]
                        },
                        {
                            "upazila": "Homna",
                            "unions": ["Homna", "Asadpur", "Bhasania", "Gagutia", "Homna", "Joypur", "Mathabanga", "Nather Petua", "Putia"]
                        },
                        {
                            "upazila": "Comilla Sadar Dakshin",
                            "unions": ["Comilla Sadar Dakshin", "Baghmara", "Bara Para", "Belghar", "Bholain", "Jagannathpur", "Perul", "Pirjatrapur"]
                        },
                        {
                            "upazila": "Comilla Sadar",
                            "unions": ["Comilla Sadar", "Amratali", "Comilla Contonment", "Comilla Sadar", "Kandirpar", "Kaptan Bazar", "Laksam", "Suaganj"]
                        },
                        {
                            "upazila": "Laksam",
                            "unions": ["Laksam", "Ajgara", "Bakai", "Gobindapur", "Kandirpar", "Uttardah", "Zakiganj"]
                        },
                        {
                            "upazila": "Monohorgonj",
                            "unions": ["Monohorgonj", "Barkamta", "Bhabanipur", "Jagannathpur", "Lauta", "Monohorgonj", "Shikar Mangal"]
                        },
                        {
                            "upazila": "Meghna",
                            "unions": ["Meghna", "Bholain", "Chandpur", "Maniker Char", "Meghna", "Radhanagar"]
                        },
                        {
                            "upazila": "Muradnagar",
                            "unions": ["Muradnagar", "Akubpur", "Andikot", "Chandla", "Chhariabazar", "Dakshin Durgapur", "Muradnagar", "Paharpur", "Paschim Jaflong", "Purba Jaflong", "Uttar Durgapur"]
                        },
                        {
                            "upazila": "Nangalkot",
                            "unions": ["Nangalkot", "Bakshaganj", "Bara Karai", "Dudhkandi", "Gouripur", "Jagannathpur", "Nangalkot", "Perul", "Sonakanda"]
                        },
                        {
                            "upazila": "Titas",
                            "unions": ["Titas", "Bakshimul", "Jahapur", "Joag", "Karerhat", "Khashalpur", "Mannanagar", "Narayanpur", "Titas"]
                        }
                    ]
                },
                {
                    "district": "Feni",
                    "upazilas": [
                        {
                            "upazila": "Chhagalnaiya",
                            "unions": ["Chhagalnaiya", "Daraga Hat", "Dharmapur", "Fazilpur", "Kalidaha", "Motiganj", "Nababpur", "Ramnarayanpur", "Sindurpur"]
                        },
                        {
                            "upazila": "Daganbhuiyan",
                            "unions": ["Daganbhuiyan", "Daganbhuiyan", "Jayloskor", "Mohanpur", "Purba Chandrapur", "Rajapur", "Ramnagar", "Sindurpur", "Yakubpur"]
                        },
                        {
                            "upazila": "Feni Sadar",
                            "unions": ["Feni Sadar", "Dharmapur", "Fazilpur", "Kazirbag", "Laskarhat", "Motiganj", "Panchgachhia", "Sarishadi", "Sharshadie"]
                        },
                        {
                            "upazila": "Parshuram",
                            "unions": ["Parshuram", "Bakshmohammad", "Chhatarchhar", "Fulgazi", "Munshirhat", "Parshuram", "Shuarbazar"]
                        },
                        {
                            "upazila": "Sonagazi",
                            "unions": ["Sonagazi", "Amirabad", "Char Chandrapur", "Char Darbesh", "Char Majlish", "Char Parbati", "Kallyandi", "Sonagazi", "Subhapur"]
                        },
                        {
                            "upazila": "Fulgazi",
                            "unions": ["Fulgazi", "Amjadhat", "Anandopur", "Darbarpur", "Fulgazi", "Gmhat", "Munshirhat", "Udaypur"]
                        }
                    ]
                },
                {
                    "district": "Khagrachhari",
                    "upazilas": [
                        {
                            "upazila": "Khagrachhari Sadar",
                            "unions": ["Khagrachhari Sadar", "Golabari", "Kamalchhari", "Khangrachhari", "Perachhara", "Sapchari"]
                        },
                        {
                            "upazila": "Dighinala",
                            "unions": ["Dighinala", "Babuchhara", "Boalkhali", "Dighinala", "Kabakhali", "Merung", "Nunchhari"]
                        },
                        {
                            "upazila": "Panchhari",
                            "unions": ["Panchhari", "Chengi", "Latiban", "Logang", "Panchhari", "Ulta Chari"]
                        },
                        {
                            "upazila": "Laxmichhari",
                            "unions": ["Laxmichhari", "Barmachhari", "Dulyatali", "Laxmichhari", "Bhaibonchhara"]
                        },
                        {
                            "upazila": "Mohalchhari",
                            "unions": ["Mohalchhari", "Maischhari", "Mobachhari", "Mogban", "Tintahari"]
                        },
                        {
                            "upazila": "Manikchhari",
                            "unions": ["Manikchhari", "Batnatali", "Jogyachhara", "Manikchhari", "Tintahari"]
                        },
                        {
                            "upazila": "Ramgarh",
                            "unions": ["Ramgarh", "Alexender", "Hafchhari", "Khedarmara", "Patachhara", "Ramgarh"]
                        },
                        {
                            "upazila": "Matiranga",
                            "unions": ["Matiranga", "Guimara", "Matiranga", "Tubalchhari", "Umachhara"]
                        },
                        {
                            "upazila": "Guimara",
                            "unions": ["Guimara", "Dhanpatila", "Guimara", "Pankhaiya", "Sindukchhari"]
                        }
                    ]
                },
                {
                    "district": "Lakshmipur",
                    "upazilas": [
                        {
                            "upazila": "Lakshmipur Sadar",
                            "unions": ["Lakshmipur Sadar", "Bhabaniganj", "Chandraganj", "Char Abdullah", "Char Alexander", "Char Mohana", "Dattapara", "Kalkini", "Panpara", "Rupganj"]
                        },
                        {
                            "upazila": "Raipur",
                            "unions": ["Raipur", "Bhadur", "Char Amanullah", "Char Gazi", "Char Ramiz", "Khanpur", "Nuralia", "Raipur"]
                        },
                        {
                            "upazila": "Ramganj",
                            "unions": ["Ramganj", "Alaxander", "Char Martin", "Char Ruhita", "Hajirhat", "Panchashar", "Ramganj", "Sultanpur"]
                        },
                        {
                            "upazila": "Ramgati",
                            "unions": ["Ramgati", "Char Abdullah", "Char Algi", "Char Badam", "Char Gazi", "Char Poragacha", "Ramgati"]
                        },
                        {
                            "upazila": "Komol Nagar",
                            "unions": ["Komol Nagar", "Char Alexandar", "Char Folcon", "Char Hazari", "Char Kadira", "Char Lawrence", "Komol Nagar"]
                        }
                    ]
                },
                {
                    "district": "Noakhali",
                    "upazilas": [
                        {
                            "upazila": "Noakhali Sadar",
                            "unions": ["Noakhali Sadar", "Anderchar", "Ashwadia", "Binodpur", "Char Elahi", "Char Fakira", "Char Parbati", "Dinarpur", "Kabirhat", "Khalifapur", "Noakhali", "Noannai", "Nurpur"]
                        },
                        {
                            "upazila": "Begumganj",
                            "unions": ["Begumganj", "Alyerpur", "Amishapara", "Banglabazar", "Bazra", "Chhayani", "Dauti", "Durgapur", "Eklashpur", "Gopalpur", "Jirtali", "Kadir Hanif", "Kutubpur", "Mir Warishpur", "Narottampur", "Rajganj", "Sonaimuri", "Tangirpar"]
                        },
                        {
                            "upazila": "Chatkhil",
                            "unions": ["Chatkhil", "Badalkot", "Batiya", "Hatpukuria", "Khilpara", "Mohammadpur", "Nayakhola", "Panchgaon", "Parkote", "Ramnarayanpur", "Sahapur", "Sreepur", "Sultanpur"]
                        },
                        {
                            "upazila": "Companiganj",
                            "unions": ["Companiganj", "Char Elahi", "Char Hazari", "Char Jabbar", "Char King", "Char Parbati", "Companiganj", "Sirajpur"]
                        },
                        {
                            "upazila": "Hatiya",
                            "unions": ["Hatiya", "Burir Char", "Char King", "Char Ishwar", "Char Madras", "Harni", "Jahajmara", "Nalchira", "Nijum Dip", "Sonadia", "Sukh Char"]
                        },
                        {
                            "upazila": "Senbagh",
                            "unions": ["Senbagh", "Arjunpur", "Chhatarpaia", "Dumurua", "Kabilpur", "Kadra", "Kesharpar", "Mugra", "Nabipur", "Senbagh", "Teprirpar"]
                        },
                        {
                            "upazila": "Sonaimuri",
                            "unions": ["Sonaimuri", "Amishapara", "Barakpur", "Deoti", "Jayag", "Nateshwar", "Sonaimuri", "Subarnachar"]
                        },
                        {
                            "upazila": "Subarnachar",
                            "unions": ["Subarnachar", "Char Algi", "Char Badam", "Char Wapda", "Kabilpur", "Purba Char Bata", "West Char Bata"]
                        },
                        {
                            "upazila": "Kabirhat",
                            "unions": ["Kabirhat", "Bataiya", "Chaprashir Hat", "Dhan Shalik", "Dhan Siri", "Ghoshbag", "Kabirhat", "Nizum Dip", "Sakuchia"]
                        }
                    ]
                },
                {
                    "district": "Rangamati",
                    "upazilas": [
                        {
                            "upazila": "Rangamati Sadar",
                            "unions": ["Rangamati Sadar", "Balukhali", "Banduk Bhanga", "Jibtali", "Kutukchhari", "Magban", "Mogban", "Rangamati", "Sapchari"]
                        },
                        {
                            "upazila": "Belaichhari",
                            "unions": ["Belaichhari", "Belaichhari", "Farua", "Kengrachhari", "Sijok"]
                        },
                        {
                            "upazila": "Bagaichhari",
                            "unions": ["Bagaichhari", "Baghaichhari", "Khedarmara", "Marishya", "Rupkar", "Sajek"]
                        },
                        {
                            "upazila": "Barkal",
                            "unions": ["Barkal", "Aimachhara", "Barkal", "Bushanchara", "Chingrikhala", "Rupashi", "Sharoyatali"]
                        },
                        {
                            "upazila": "Juraichhari",
                            "unions": ["Juraichhari", "Bonjugi Chhara", "Juraichhari", "Maidang", "Maidang Headman", "Sublang"]
                        },
                        {
                            "upazila": "Rajasthali",
                            "unions": ["Rajasthali", "Bangalhalia", "Gainda", "Ghila Chhari", "Kaptai", "Rajasthali"]
                        },
                        {
                            "upazila": "Kaptai",
                            "unions": ["Kaptai", "Chandraghona", "Kaptai", "Raikhali", "Wagga"]
                        },
                        {
                            "upazila": "Langadu",
                            "unions": ["Langadu", "Bhasanya Adam", "Bogachatar", "Gulshakhali", "Kalapakurjya", "Langadu", "Maeinimukh", "Venga"]
                        },
                        {
                            "upazila": "Nannerchar",
                            "unions": ["Nannerchar", "Burighat", "Ghagra", "Nannerchar", "Simaichar"]
                        },
                        {
                            "upazila": "Kaukhali",
                            "unions": ["Kaukhali", "Bangalhalia", "Chitmorom", "Kaukhali", "Kolompati"]
                        }
                    ]
                }
            ]
        },
       
        {
            "division": "Dhaka",
            "districts": [
              {
                "district": "Dhaka",
                "upazilas": [
                  {
                    "upazila": "Dhaka Sadar",
                    "unions": ["North Shahjahanpur", "South Shahjahanpur", "Basila", "Hazaribagh", "Kamrangirchar", "Lalbagh"]
                  },
                  {
                    "upazila": "Dhamrai",
                    "unions": ["Amarpur", "Baisakanda", "Bilaspur", "Dhamrai", "Kulla", "Rowail", "Sanora"]
                  },
                  {
                    "upazila": "Dohar",
                    "unions": ["Bilaspur", "Dohar", "Kushumhati", "Mahmudpur", "Muksudpur", "Narisha", "Sutarpara"]
                  },
                  {
                    "upazila": "Keraniganj",
                    "unions": ["Ati", "Hazratpur", "Kalatia", "Keraniganj", "Ruhitpur", "Sakta", "Talla"]
                  },
                  {
                    "upazila": "Nawabganj",
                    "unions": ["Bandura", "Daudpur", "Dulalpur", "Ghior", "Nayanshree", "Shikaripara"]
                  },
                  {
                    "upazila": "Savar",
                    "unions": ["Aminbazar", "Ashulia", "Birulia", "Dhamsona", "Kaundia", "Pathalia", "Savar", "Tetuljhora"]
                  }
                ]
              },
              {
                "district": "Faridpur",
                "upazilas": [
                  {
                    "upazila": "Faridpur Sadar",
                    "unions": ["Aliabad", "Alipur", "Charmadhabdia", "Decreerchar", "Faridpur", "Kanaipur", "Krishnapur", "Majchar"]
                  },
                  {
                    "upazila": "Alfadanga",
                    "unions": ["Alfadanga", "Bana", "Buraich", "Gopalpur", "Panchuria", "Tagarbanda"]
                  },
                  {
                    "upazila": "Boalmari",
                    "unions": ["Boalmari", "Chatul", "Dadpur", "Ghoshpur", "Gunbaha", "Parameshwardi", "Rupapat"]
                  },
                  {
                    "upazila": "Sadarpur",
                    "unions": ["Bharat", "Char Bhadrasan", "Char Jhukunda", "Dheukhali", "Krishnanagar", "Sadarpur"]
                  },
                  {
                    "upazila": "Nagarkanda",
                    "unions": ["Algi", "Chandpur", "Gatti", "Jadunandi", "Kalamridha", "Nagarkanda", "Talma"]
                  },
                  {
                    "upazila": "Bhanga",
                    "unions": ["Alabad", "Bhanga", "Chumurdi", "Gharua", "Hamirdi", "Kalam", "Kaoliber", "Moyen"]
                  },
                  {
                    "upazila": "Charbhadrasan",
                    "unions": ["Char Bhadrasan", "Char Harirampur", "Char Janazat", "Char Madras", "Char Shahpur"]
                  },
                  {
                    "upazila": "Madhukhali",
                    "unions": ["Bagat", "Dumain", "Gajna", "Jahapur", "Kamarkhali", "Madhukhali", "Megchami", "Noapara"]
                  },
                  {
                    "upazila": "Saltha",
                    "unions": ["Atghar", "Gatti", "Jadunandi", "Jahapur", "Kalamridha", "Saltha", "Talma"]
                  }
                ]
              },
              {
                "district": "Gazipur",
                "upazilas": [
                  {
                    "upazila": "Gazipur Sadar",
                    "unions": ["Baria", "Gazipur", "Gosinagar", "Kashimpur", "Konabari", "Mirzapur", "Pubail"]
                  },
                  {
                    "upazila": "Kaliakair",
                    "unions": ["Atabaha", "Boali", "Chandpur", "Kaliakair", "Mouchak", "Purbachal", "Sreefaltali"]
                  },
                  {
                    "upazila": "Kaliganj",
                    "unions": ["Baktarpur", "Jamalpur", "Kaliganj", "Moktarpur", "Nagari", "Tumulia"]
                  },
                  {
                    "upazila": "Kapasia",
                    "unions": ["Chandpur", "Durgapur", "Karihata", "Kashoria", "Rayed", "Singhasree", "Targoan"]
                  },
                  {
                    "upazila": "Sreepur",
                    "unions": ["Barmi", "Gazipur", "Maona", "Phulpur", "Rajabari", "Sreepur", "Telihati"]
                  }
                ]
              },
              {
                "district": "Gopalganj",
                "upazilas": [
                  {
                    "upazila": "Gopalganj Sadar",
                    "unions": ["Batikamari", "Gopinathpur", "Kashiani", "Kotalipara", "Krishnanagar", "Ulpur"]
                  },
                  {
                    "upazila": "Kashiani",
                    "unions": ["Hatiara", "Kashiani", "Orakandia", "Parulia", "Puisur", "Raghdi", "Sajail"]
                  },
                  {
                    "upazila": "Kotalipara",
                    "unions": ["Amtoli", "Bandhabari", "Kotalipara", "Kushla", "Pinjuri", "Radia", "Sahapur"]
                  },
                  {
                    "upazila": "Muksudpur",
                    "unions": ["Baharato", "Banshbaria", "Dignagar", "Khandarpara", "Maharajpur", "Mochna", "Poshargati"]
                  },
                  {
                    "upazila": "Tungipara",
                    "unions": ["Dumuria", "Kochua", "Lohajang", "Panihati", "Tungipara"]
                  }
                ]
              },
              {
                "district": "Kishoreganj",
                "upazilas": [
                  {
                    "upazila": "Kishoreganj Sadar",
                    "unions": ["Baulai", "Chandpur", "Garpara", "Jasodal", "Kishoreganj", "Maizkhapan", "Maria", "Sadia"]
                  },
                  {
                    "upazila": "Austagram",
                    "unions": ["Adampur", "Austagram", "Bangalpara", "Deoghar", "Kalma", "Kastul", "Khayerpur Abdullah"]
                  },
                  {
                    "upazila": "Bajitpur",
                    "unions": ["Bajitpur", "Dilalpur", "Dighirpar", "Gazirchar", "Halimpur", "Hilochia", "Shahbazpur"]
                  },
                  {
                    "upazila": "Bhairab",
                    "unions": ["Bhairab", "Fulpur", "Kalika Prasad", "Kewarjore", "Mashkanda", "Shimulkandi"]
                  },
                  {
                    "upazila": "Hossainpur",
                    "unions": ["Gobaria Abdullahpur", "Hossainpur", "Jinari", "Pumdi", "Sahedali", "Sidhla"]
                  },
                  {
                    "upazila": "Itna",
                    "unions": ["Badla", "Itna", "Joy Siddhi", "Mohnagar", "Raituti", "Raytoti"]
                  },
                  {
                    "upazila": "Karimganj",
                    "unions": ["Chhatirchar", "Gujadia", "Karimganj", "Kathair", "Latibabad", "Narandi", "Shukhia"]
                  },
                  {
                    "upazila": "Katiadi",
                    "unions": ["Achmita", "Katiadi", "Lohajuree", "Masua", "Shahasram", "Sukhia"]
                  },
                  {
                    "upazila": "Nikli",
                    "unions": ["Dampara", "Gurai", "Jaraitala", "Karpasha", "Nikli", "Singpur"]
                  },
                  {
                    "upazila": "Pakundia",
                    "unions": ["Baliardi", "Egarasindur", "Hosendi", "Pakundia", "Patuari", "Sukhia"]
                  },
                  {
                    "upazila": "Tarail",
                    "unions": ["Dampara", "Dewghar", "Digdair", "Jawar", "Rauti", "Tarail-Sachail"]
                  }
                ]
              },
              {
                "district": "Madaripur",
                "upazilas": [
                  {
                    "upazila": "Madaripur Sadar",
                    "unions": ["Bahadurpur", "Chandpur", "Char Janazat", "Kadirpur", "Kalkini", "Madaripur", "Rajoird"]
                  },
                  {
                    "upazila": "Kalkini",
                    "unions": ["Alinagar", "Baligram", "Dasar", "Kalkini", "Kazibakai", "Sahabrampur", "Sekharnagar"]
                  },
                  {
                    "upazila": "Rajoir",
                    "unions": ["Amgram", "Hajipur", "Khaliya", "Rajoir", "Ramkantapur", "Rasulpur"]
                  },
                  {
                    "upazila": "Shibchar",
                    "unions": ["Bandarkhola", "Dadshi", "Dattapara", "Laskardia", "Sannasi", "Shibchar", "Umedpur"]
                  }
                ]
              },
              {
                "district": "Manikganj",
                "upazilas": [
                  {
                    "upazila": "Manikganj Sadar",
                    "unions": ["Atigram", "Betila", "Bohail", "Dhakshin", "Gorpara", "Manikganj", "Nabogram"]
                  },
                  {
                    "upazila": "Singair",
                    "unions": ["Baldhara", "Baira", "Chala", "Dhulsura", "Jalsuka", "Singair", "Zamsha"]
                  },
                  {
                    "upazila": "Shibalaya",
                    "unions": ["Aruoa", "Bachamara", "Baghutia", "Dhamswar", "Shibalaya", "Uthali"]
                  },
                  {
                    "upazila": "Saturia",
                    "unions": ["Baghi", "Baghutia", "Dhankora", "Dighi", "Fukurhati", "Saturia"]
                  },
                  {
                    "upazila": "Harirampur",
                    "unions": ["Azimnagar", "Balla", "Baniajuri", "Gala", "Harirampur", "Sutalari"]
                  },
                  {
                    "upazila": "Ghior",
                    "unions": ["Baliakhora", "Baniajuri", "Ghior", "Krishnapur", "Nalee", "Pali"]
                  },
                  {
                    "upazila": "Daulatpur",
                    "unions": ["Bachamara", "Baghutia", "Charkatari", "Daulatpur", "Harirampur", "Kusumbi"]
                  }
                ]
              },
              {
                "district": "Munshiganj",
                "upazilas": [
                  {
                    "upazila": "Munshiganj Sadar",
                    "unions": ["Adampur", "Bajrajogini", "Banglabazar", "Charigaon", "Mirkadim", "Munshiganj", "Rikabibazar"]
                  },
                  {
                    "upazila": "Lohajang",
                    "unions": ["Baultoli", "Haldia", "Kalma", "Khidirpur", "Kumarbhog", "Lohajang", "Medini Mandal"]
                  },
                  {
                    "upazila": "Sreenagar",
                    "unions": ["Baghra", "Bakshipur", "Bandarkhola", "Kolapara", "Kukutia", "Patabhog", "Sreenagar"]
                  },
                  {
                    "upazila": "Sirajdikhan",
                    "unions": ["Ichhapura", "Kola", "Kumarbhog", "Malkhanagar", "Matbar", "Sirajdikhan", "Uthali"]
                  },
                  {
                    "upazila": "Tongibari",
                    "unions": ["Autshahi", "Baishtoli", "Basail", "Dhipur", "Kathadia", "Kusumpur", "Magarpara"]
                  },
                  {
                    "upazila": "Gazaria",
                    "unions": ["Baluakandi", "Gazaria", "Guagachia", "Haldia", "Imampur", "Tenger Char"]
                  }
                ]
              },
              {
                "district": "Narayanganj",
                "upazilas": [
                  {
                    "upazila": "Narayanganj Sadar",
                    "unions": ["Bandar", "Dakhsin Khan", "Fatullah", "Kadam Rasul", "Kashipur", "Lakshmipur", "Madanpur"]
                  },
                  {
                    "upazila": "Araihazar",
                    "unions": ["Araihazar", "Bishnandi", "Brahmondi", "Duptara", "Fatehpur", "Haizadi", "Kala Paharia"]
                  },
                  {
                    "upazila": "Bandar",
                    "unions": ["Bandar", "Dakshin Panishar", "Dhamaldi", "Kalagachhia", "Madanpur", "Musapur"]
                  },
                  {
                    "upazila": "Rupganj",
                    "unions": ["Bholaba", "Kayetpara", "Murapara", "Rupganj", "Tarabo", "Baidyer Bazar"]
                  },
                  {
                    "upazila": "Sonargaon",
                    "unions": ["Baidyer Bazar", "Baradi", "Mugrapara", "Noagaon", "Pirijpur", "Sonargaon"]
                  }
                ]
              },
              {
                "district": "Narsingdi",
                "upazilas": [
                  {
                    "upazila": "Narsingdi Sadar",
                    "unions": ["Alokbali", "Amirganj", "Chandpur", "Char Dighaldi", "Chinishpur", "Hajipur", "Karimpur"]
                  },
                  {
                    "upazila": "Belabo",
                    "unions": ["Belabo", "Binyabaid", "Char Ujilaba", "Narayanpur", "Patuli", "Sallabad"]
                  },
                  {
                    "upazila": "Monohardi",
                    "unions": ["Hatipur", "Jinardi", "Kanchikata", "Muzaffarpur", "Monohardi", "Shibpur"]
                  },
                  {
                    "upazila": "Palash",
                    "unions": ["Char Aralia", "Danga", "Ghorashal", "Jinardi", "Palash", "Sreenagar"]
                  },
                  {
                    "upazila": "Raipura",
                    "unions": ["Bara Chapa", "Dulalpur", "Kanchan", "Mohishasur", "Nagri", "Raipura", "Shivpur"]
                  },
                  {
                    "upazila": "Shibpur",
                    "unions": ["Ayubpur", "Baghabo", "Chakradha", "Charmandalia", "Krisnopur", "Shibpur"]
                  }
                ]
              },
              {
                "district": "Rajbari",
                "upazilas": [
                  {
                    "upazila": "Rajbari Sadar",
                    "unions": ["Alipur", "Banibaha", "Basantapur", "Daulatpur", "Khankhanapur", "Mulghar", "Rajbari"]
                  },
                  {
                    "upazila": "Baliakandi",
                    "unions": ["Baliakandi", "Jamalpur", "Jangal", "Nalia", "Narua", "Peyarpur"]
                  },
                  {
                    "upazila": "Goalandaghat",
                    "unions": ["Adabaria", "Chandani", "Goalandaghat", "Gossaba", "Kandi", "Kushlia"]
                  },
                  {
                    "upazila": "Pangsha",
                    "unions": ["Babupara", "Balidia", "Habashpur", "Kalidaha", "Pangsha", "Ratandia", "Sadarpur"]
                  },
                  {
                    "upazila": "Kalukhali",
                    "unions": ["Kalikapur", "Kalukhali", "Majbari", "Manikerdaha", "Rauti", "Shahid Wahabpur"]
                  }
                ]
              },
              {
                "district": "Shariatpur",
                "upazilas": [
                  {
                    "upazila": "Shariatpur Sadar",
                    "unions": ["Angaria", "Chandrapur", "Chikandi", "Kedarpur", "Narayanpur", "Palong", "Shariatpur"]
                  },
                  {
                    "upazila": "Naria",
                    "unions": ["Bhojeswar", "Bhumkhara", "Japsa", "Kadirpur", "Naria", "Umedpur"]
                  },
                  {
                    "upazila": "Zajira",
                    "unions": ["Bara Gopalpur", "Bara Krishnagar", "Barakandi", "Kundarchar", "Mulna", "Zajira"]
                  },
                  {
                    "upazila": "Gosairhat",
                    "unions": ["Gariber Char", "Gosairhat", "Idilpur", "Kadirpur", "Nager Para", "Samantasar"]
                  },
                  {
                    "upazila": "Bhedarganj",
                    "unions": ["Bhedarganj", "Kachikata", "Mahmudpur", "Muktarer Char", "Sakhipur", "Tulasar"]
                  },
                  {
                    "upazila": "Damudya",
                    "unions": ["Damudya", "Darul Aman", "Dhanesshor", "Islampur", "Sidulkura", "Sidya"]
                  }
                ]
              },
              {
                "district": "Tangail",
                "upazilas": [
                  {
                    "upazila": "Tangail Sadar",
                    "unions": ["Baghil", "Gala", "Gharinda", "Hugra", "Kakua", "Korotia", "Lohani", "Pathrail"]
                  },
                  {
                    "upazila": "Sakhipur",
                    "unions": ["Balla", "Baniazuri", "Dariapur", "Jadabpur", "Kakraon", "Sakhipur", "Salla"]
                  },
                  {
                    "upazila": "Basail",
                    "unions": ["Basail", "Fulki", "Habla", "Kanchanpur", "Kauljani", "Kok-Daria"]
                  },
                  {
                    "upazila": "Madhupur",
                    "unions": ["Arankhola", "Ausnara", "Golabari", "Mirzapur", "Saturia", "Sholakuri"]
                  },
                  {
                    "upazila": "Ghatail",
                    "unions": ["Deopara", "Dhalapara", "Digalkandi", "Ghatail", "Jamuria", "Lohani", "Rasulpur"]
                  },
                  {
                    "upazila": "Kalihati",
                    "unions": ["Balla", "Bangra", "Eklaspur", "Kalihati", "Nagbari", "Nagdashimla", "Narandia"]
                  },
                  {
                    "upazila": "Nagarpur",
                    "unions": ["Bekra", "Dhuburia", "Durgapur", "Mokna", "Nagarpur", "Pakutia", "Sahabathpur"]
                  },
                  {
                    "upazila": "Mirzapur",
                    "unions": ["Ajgana", "Aloa", "Anaitara", "Bahuria", "Banshtail", "Bhaora", "Fatehpur"]
                  },
                  {
                    "upazila": "Gopalpur",
                    "unions": ["Alamnagar", "Dhopakandi", "Hadira", "Hemnagar", "Jhowail", "Mirzapur"]
                  },
                  {
                    "upazila": "Delduar",
                    "unions": ["Atia", "Delduar", "Deoli", "Dubail", "Elasin", "Lauhati", "Pathrail"]
                  },
                  {
                    "upazila": "Bhuapur",
                    "unions": ["Arjuna", "Bhuapur", "Dhopakandi", "Elasin", "Fulki", "Gossainpur", "Nikrail"]
                  },
                  {
                    "upazila": "Dhanbari",
                    "unions": ["Baharato", "Balla", "Dhanbari", "Digarkanda", "Dhuburia", "Paiska", "Salla"]
                  }
                ]
              }
            ]
          },
          {
            "division": "Mymensingh",
            "districts": [
                {
                    "district": "Jamalpur",
                    "upazilas": [
                        {
                            "upazila": "Jamalpur Sadar",
                            "unions": ["Banshchara", "Badosh Kura", "Chadpur", "Dhanua", "Ghoradhap", "Jagannath Ghat", "Jamalpur", "Kendua", "Kulkandi", "Mahmudpur", "Narundi", "Ranagachha", "Rashidpur", "Sahabajpur", "Shibganj", "Shukhari", "Singheshwar"]
                        },
                        {
                            "upazila": "Bakshiganj",
                            "unions": ["Bakshiganj", "Battajore", "Dhanikhola", "Gunahar", "Jorekhali", "Kakraid", "Madhupur", "Sadhurpara"]
                        },
                        {
                            "upazila": "Dewanganj",
                            "unions": ["Chandrabari", "Dangdhara", "Dewanganj", "Hatebhanga", "Parramrampur", "Parthashi", "Sonahar"]
                        },
                        {
                            "upazila": "Islampur",
                            "unions": ["Belghacha", "Chargirish", "Chinaduli", "Gopalpur", "Islampur", "Jhaugara", "Kulkandi", "Noarpara", "Palabandha", "Parthashi", "Saharbati", "Singhania"]
                        },
                        {
                            "upazila": "Madarganj",
                            "unions": ["Adarbhita", "Bhalukgachh", "Jagannathpur", "Karaichara", "Kutubpur", "Madarganj", "Sidhuli"]
                        },
                        {
                            "upazila": "Melandaha",
                            "unions": ["Adra", "Char Amkhaoa", "Ghosherpara", "Jhaugara", "Kushmail", "Melandaha", "Nangla", "Pingna"]
                        },
                        {
                            "upazila": "Sarishabari",
                            "unions": ["Aona", "Bhatara", "Dhanua", "Dharmapasha", "Gala", "Jagannathpur", "Kauripara", "Kushiram", "Nalka", "Pingna", "Sarishabari", "Sultanpur"]
                        }
                    ]
                },
                {
                    "district": "Mymensingh",
                    "upazilas": [
                        {
                            "upazila": "Mymensingh Sadar",
                            "unions": ["Akua", "Baira", "Bhabkhali", "Biddyaganj", "Borogram", "Chandipasha", "Char Ishwardia", "Dapunia", "Ghagra", "Kawatkhil", "Khagdahar", "Kusumpur", "Mamar Char", "Mouchak", "Rahamatpur", "Shambhuganj", "Suti"]
                        },
                        {
                            "upazila": "Bhaluka",
                            "unions": ["Bhaluka", "Bharadoba", "Birunia", "Dakatia", "Dhitpur", "Habirbari", "Kachina", "Mallikbari", "Meduary", "Moshakhali", "Paranganj", "Rahimganj", "Sutarpara"]
                        },
                        {
                            "upazila": "Dhobaura",
                            "unions": ["Baghber", "Dakshin Maijpara", "Dhobaura", "Gamaritola", "Gosaipur", "Kakni", "Kullagora", "Mollapara", "Paithal", "Sidhla", "Suair"]
                        },
                        {
                            "upazila": "Fulbaria",
                            "unions": ["Bakta", "Balian", "Bilchalan", "Dhakua", "Enayetpur", "Fulbaria", "Kaladaha", "Kalihati", "Kushmail", "Naogaon", "Pura", "Ranga", "Ranishimul", "Rathura", "Tarakanda"]
                        },
                        {
                            "upazila": "Gaffargaon",
                            "unions": ["Baggha", "Char Algi", "Datter Bazar", "Gaffargaon", "Jhaoail", "Kamarail", "Mashakhali", "Mashkanda", "Niguari", "Panchbagh", "Paithal", "Rasulpur", "Raona", "Saltia", "Tengaba"]
                        },
                        {
                            "upazila": "Gauripur",
                            "unions": ["Balian", "Bhabkhali", "Dhanikhola", "Gauripur", "Haranathpur", "Kushmail", "Mamnura", "Muktagachha", "Rampur", "Sahadebpur", "Sultanpur"]
                        },
                        {
                            "upazila": "Haluaghat",
                            "unions": ["Amtoil", "Bhubankura", "Bildora", "Dhara", "Dhurail", "Gazirbhita", "Haluaghat", "Jugli", "Kaichapur", "Narail", "Sakuai", "Swadeshi"]
                        },
                        {
                            "upazila": "Ishwarganj",
                            "unions": ["Atharabari", "Barahit", "Ishwarganj", "Magtula", "Maijbagh", "Rajibpur", "Sarisha", "Sohagi", "Tarundia", "Uchakhila"]
                        },
                        {
                            "upazila": "Muktagachha",
                            "unions": ["Baragram", "Birasree", "Dhanikhola", "Garadia", "Kashimpur", "Kheruajan", "Muktagachha", "Ostagram", "Pirgachha", "Rampur", "Sahadebpur"]
                        },
                        {
                            "upazila": "Nandail",
                            "unions": ["Achargaon", "Bagra", "Bajitpur", "Chandipasha", "Gangail", "Jahangirpur", "Kharua", "Mushulli", "Nandail", "Rajgati", "Sherpur", "Singroil"]
                        },
                        {
                            "upazila": "Phulpur",
                            "unions": ["Balia", "Balia", "Baniajan", "Banshchara", "Birisiri", "Dhakua", "Dhakshin Bangara", "Gamaritola", "Kakni", "Kamargaon", "Phulpur", "Rahamatpur", "Rampur", "Sandhara", "Tarakanda"]
                        },
                        {
                            "upazila": "Trishal",
                            "unions": ["Amirabari", "Balipara", "Baliya", "Dhanikhola", "Dhubaura", "Kanchon", "Kanthal", "Mokshapur", "Rampur", "Sakhua", "Trishal"]
                        }
                    ]
                },
                {
                    "district": "Netrokona",
                    "upazilas": [
                        {
                            "upazila": "Netrokona Sadar",
                            "unions": ["Amtala", "Baidyer Bazar", "Balaishimul", "Bara Alampur", "Challisha", "Dakshin Bishiura", "Kailati", "Kaliara Gabragati", "Kaliara Korotia", "Lakshmiganj", "Madanpur", "Maghan", "Maghan Siadar", "Maugati", "Monga", "Netrokona Sadar", "Rauha", "Roypur", "Suair", "Teligati"]
                        },
                        {
                            "upazila": "Atpara",
                            "unions": ["Atpara", "Baghati", "Baghmar", "Bishiura", "Dakshin Ranagaon", "Dakshin Susung", "Durgapur", "Lahiri", "Laxmipur", "Poil", "Uttar Ranagaon", "Uttar Susung"]
                        },
                        {
                            "upazila": "Barhatta",
                            "unions": ["Asma", "Barhatta", "Baushi", "Bhairab", "Chhiram", "Chowkibari", "Dhara", "Gala", "Mulia", "Roypur", "Sahata", "Singdha"]
                        },
                        {
                            "upazila": "Durgapur",
                            "unions": ["Bakaljora", "Birisiri", "Chandigarh", "Dakshin Narayanpur", "Durgapur", "Kakair", "Kullagora", "Lengura", "Mogor Khal", "Rajanagar", "Uttar Narayanpur"]
                        },
                        {
                            "upazila": "Khaliajuri",
                            "unions": ["Chakua", "Gayabari", "Khaliajuri", "Krishnapur", "Mendipur", "Nagar", "Noapara", "Pachimgaon", "Purba Gaon", "Sadhurapur", "Sandikona", "Shormushia"]
                        },
                        {
                            "upazila": "Kendua",
                            "unions": ["Asujia", "Bala Ramkrishnapur", "Bara Khapan", "Chandigarh", "Gobindasree", "Jaria", "Kendua", "Laxmipur", "Mokerpur", "Narandia", "Noapara", "Paikura", "Rajanagar", "Rashidpur", "Shaldigha", "Sukhair", "Tepamadhupur"]
                        },
                        {
                            "upazila": "Madan",
                            "unions": ["Chandgaon", "Gobindasree", "Kaitail", "Krishnapur", "Madan", "Maghan", "Nayekpur", "Noapara", "Patharia", "Rajnagar", "Rasulpur", "Sermon", "Shibpur", "Sujapur", "Tengra"]
                        },
                        {
                            "upazila": "Mohanganj",
                            "unions": ["Balidia", "Baniajan", "Bara Alampur", "Baushi", "Bhati", "Bhati Para", "Gagolakanda", "Kalikapur", "Kandiura", "Kushmail", "Mohanganj", "Narandia", "Rani Shimul", "Salamabad", "Suair", "Sultanpur"]
                        },
                        {
                            "upazila": "Purbadhala",
                            "unions": ["Agia", "Bairaty", "Bhadra", "Bishkakuni", "Dakshin Narayanpur", "Dakshin Shahabajpur", "Dhalamulgaon", "Gauripur", "Hogla", "Jaria", "Kaliara", "Kaliara Gabragati", "Khalishaur", "Maugati", "Purbadhala", "Rani Shimul", "Raypur", "Shahabajpur", "Shyamkur", "Uttar Shahabajpur"]
                        }
                    ]
                },
                {
                    "district": "Sherpur",
                    "upazilas": [
                        {
                            "upazila": "Sherpur Sadar",
                            "unions": ["Bajitkhila", "Bakshigonj", "Balair Char", "Betmari Ghughurakandi", "Char Mucharia", "Dhakuria", "Garjaripa", "Kamarer Char", "Kamaria", "Kolar Char", "Kurikahania", "Majhiper", "Mokshapur", "Pakuriya", "Rani Shimul", "Sherpur Sadar", "Shibrampur", "Tentulbaria"]
                        },
                        {
                            "upazila": "Jhenaigati",
                            "unions": ["Hatibandha", "Jhenaigati", "Kangsha", "Malijhikanda", "Nalka", "Nayabil", "Parbatipur"]
                        },
                        {
                            "upazila": "Nakla",
                            "unions": ["Baneshwardi", "Baoishkanda", "Chandrakona", "Char Ashtadhar", "Gonopaddi", "Jogania", "Kakorkand", "Kushum Hati", "Nakla", "Pakuria", "Pathakata", "Talki"]
                        },
                        {
                            "upazila": "Nalitabari",
                            "unions": ["Baghber", "Bagra", "Bara Bari", "Jogannathpur", "Kakilakura", "Marichpuran", "Nalitabari", "Nayabil", "Pangashi", "Polet", "Rupnarayankura", "Tarakanda"]
                        },
                        {
                            "upazila": "Sreebardi",
                            "unions": ["Bhelua", "Chandrakona", "Dhakua", "Ghagra", "Jaria", "Kakorkand", "Kushumhati", "Mazuria", "Sreebardi", "Sutalari"]
                        }
                    ]
                }
            ]
        },
        {
            "division": "Rajshahi",
            "districts": [
              {
                "district": "Bogura",
                "upazilas": [
                  {
                    "upazila": "Bogura Sadar",
                    "unions": ["Chakrajapuri", "Dangapara", "Dariapur", "Gokul", "Lahiri Para", "Nishindara", "Noongola", "Rajapur", "Shabgram", "Shakharia"]
                  },
                  {
                    "upazila": "Adamdighi",
                    "unions": ["Adamdighi", "Chapapur", "Kundagram", "Naruamala", "Santahar", "Shatagram"]
                  },
                  {
                    "upazila": "Dhunat",
                    "unions": ["Bhandarbari", "Chaukibari", "Dhunat", "Elangi", "Gopalnagar", "Gosainbari", "Kalerpara", "Mathurapur", "Nimgachi", "Chhatiangram"]
                  },
                  {
                    "upazila": "Dhupchanchia",
                    "unions": ["Chhatiangram", "Dhupchanchia", "Gobindapur", "Gunahar", "Talora", "Zianagar"]
                  },
                  {
                    "upazila": "Gabtali",
                    "unions": ["Bishalpur", "Gabtali", "Kagoil", "Mahishaban", "Naruamala", "Nasipur", "Palli Unnyan Accademy", "Sukhanpukhari", "Bhabanipur"]
                  },
                  {
                    "upazila": "Kahaloo",
                    "unions": ["Kahaloo", "Durgapur", "Jamgaon", "Kalampur", "Malancha", "Murail", "Narahatta", "Paurashava", "Sardah"]
                  },
                  {
                    "upazila": "Nandigram",
                    "unions": ["Bhatra", "Bhatsala", "Burail", "Nandigram", "Thalta Majhgram", "Kichok"]
                  },
                  {
                    "upazila": "Sariakandi",
                    "unions": ["Bhelabari", "Bohail", "Chaluabari", "Chandanbaisha", "Fulbari", "Hat Sherpur", "Kamalpur", "Karnibari", "Kazla", "Kutubpur", "Narchi", "Sariakandi", "Shimabari", "Sughat"]
                  },
                  {
                    "upazila": "Sherpur",
                    "unions": ["Bakshanagar", "Bishalpur", "Khanpur", "Kusumbi", "Majhira", "Mokamtala", "Pakulla", "Sherpur", "Shibpur"]
                  },
                  {
                    "upazila": "Shibganj",
                    "unions": ["Deuli", "Gunahar", "Jatrapur", "Kichok", "Kumarpur", "Marua", "Napunia", "Saidpur", "Shibganj", "Sreekol", "Tentulbaria"]
                  },
                  {
                    "upazila": "Sonatala",
                    "unions": ["Balua", "Digson", "Jorgachhi", "Madla", "Maksu", "Nimaichara", "Sonatala", "Tekani Chukinagar"]
                  }
                ]
              },
              {
                "district": "Chapai Nawabganj",
                "upazilas": [
                  {
                    "upazila": "Chapai Nawabganj Sadar",
                    "unions": ["Alinagar", "Bakshiganj", "Barogharia", "Char Anupnagar", "Char Bagdanga", "Debinagar", "Jhilim", "Kansat", "Manakosa", "Nayatola", "Radhanagar", "Rahanpur", "Shahjahanpur", "Shyampur"]
                  },
                  {
                    "upazila": "Bholahat",
                    "unions": ["Bholahat", "Daldali", "Gohalbari", "Jambaria", "Kansat", "Mahimaganj"]
                  },
                  {
                    "upazila": "Gomastapur",
                    "unions": ["Alinagar", "Bangabari", "Bhatra", "Boalia", "Chowdala", "Gomastapur", "Parbatipur", "Radhanagar", "Rahanpur", "Shahjahanpur"]
                  },
                  {
                    "upazila": "Nachole",
                    "unions": ["Fatehpur", "Kasba", "Nachole", "Nizampur"]
                  },
                  {
                    "upazila": "Shibganj",
                    "unions": ["Binodpur", "Chak Kirti", "Daipukuria", "Dhainagar", "Durlabhpur", "Ghorapakhia", "Kumarpur", "Mobarakpur", "Monakasha", "Panchbibi", "Panka", "Shahbajpur", "Shibganj", "Sonamosjid", "Tekani"]
                  }
                ]
              },
              {
                "district": "Joypurhat",
                "upazilas": [
                  {
                    "upazila": "Joypurhat Sadar",
                    "unions": ["Amdai", "Bagjana", "Baso", "Dhalahar", "Dogachi", "Jamalpur", "Joypurhat", "Kusumba", "Laxmanpur", "Mohammadpur", "Puranapail", "Rukindipur", "Shahibazar", "Tilakpur"]
                  },
                  {
                    "upazila": "Akkelpur",
                    "unions": ["Akkelpur", "Gopinathpur", "Raikali", "Saguna", "Tepa", "Tilakpur"]
                  },
                  {
                    "upazila": "Kalai",
                    "unions": ["Kalai", "Mollapara", "Punat", "Udaypur"]
                  },
                  {
                    "upazila": "Khetlal",
                    "unions": ["Alampur", "Barail", "Khetlal", "Mamudpur", "Sahapur"]
                  },
                  {
                    "upazila": "Panchbibi",
                    "unions": ["Aolai", "Atapur", "Awlai", "Chakborkat", "Durmuth", "Elangi", "Kusumba", "Mohammadpur", "Panchbibi", "Vobanipur"]
                  }
                ]
              },
              {
                "district": "Naogaon",
                "upazilas": [
                  {
                    "upazila": "Naogaon Sadar",
                    "unions": ["Balihar", "Barshail", "Bhootnagar", "Chandipur", "Dubalhati", "Hajinagar", "Khalisha", "Maniary", "Naogaon", "Nitpur", "Panguri", "Patnitala", "Shahagola", "Tilakpur"]
                  },
                  {
                    "upazila": "Atrai",
                    "unions": ["Atrai", "Bagra", "Bhadra", "Bhandara", "Bisha", "Krishnapur", "Maheshpur", "Majhiary", "Sahagola", "Salandar"]
                  },
                  {
                    "upazila": "Badalgachhi",
                    "unions": ["Adhaipur", "Badalgachhi", "Bhadsha", "Mothurapur", "Paharpur", "Paurashava", "Vobanipur"]
                  },
                  {
                    "upazila": "Dhamoirhat",
                    "unions": ["Agra", "Alampur", "Aranagar", "Dhamoirhat", "Isabpur", "Jahanpur", "Khelna", "Omar", "Porushati"]
                  },
                  {
                    "upazila": "Manda",
                    "unions": ["Bhalain", "Bharso", "Bishnupur", "Kashopara", "Manda", "Nurullabad", "Paranpur", "Prasadpur", "Tentulia"]
                  },
                  {
                    "upazila": "Mohadevpur",
                    "unions": ["Baktiarpur", "Barshail", "Ganeshpur", "Mohadevpur", "Monmothopur", "Nirmail", "Palsa", "Raghabpur", "Rashidpur", "Safapur"]
                  },
                  {
                    "upazila": "Niamatpur",
                    "unions": ["Niamatpur", "Parail", "Rajarampur", "Rasulpur", "Shahabajpur", "Sreepur"]
                  },
                  {
                    "upazila": "Patnitala",
                    "unions": ["Ahmadpur", "Akbarpur", "Kalikapur", "Patnitala", "Shahapur", "Shishua"]
                  },
                  {
                    "upazila": "Porsha",
                    "unions": ["Ganguria", "Ghatnagar", "Makhna", "Porsha", "Tentulia"]
                  },
                  {
                    "upazila": "Raninagar",
                    "unions": ["Bargacha", "Birisiri", "Gona", "Kashimpur", "Khidirpur", "Raninagar", "Shilmaria"]
                  },
                  {
                    "upazila": "Sapahar",
                    "unions": ["Aihai", "Goala", "Pathari", "Sapahar", "Tilna", "Tirnai"]
                  }
                ]
              },
              {
                "district": "Natore",
                "upazilas": [
                  {
                    "upazila": "Natore Sadar",
                    "unions": ["Bipra Belgharia", "Chhatni", "Dighapatia", "Kashimpur", "Lalpur", "Madhnagar", "Natore", "Piprul", "Shahebpur", "Tebaria"]
                  },
                  {
                    "upazila": "Bagatipara",
                    "unions": ["Bagatipara", "Dayarampur", "Faguardiar", "Jamnagar", "Paka", "Pirojpur"]
                  },
                  {
                    "upazila": "Baraigram",
                    "unions": ["Baraigram", "Gopalpur", "Joari", "Jonail", "Majgaon", "Nagar", "Panka"]
                  },
                  {
                    "upazila": "Gurudaspur",
                    "unions": ["Biaghat", "Chapila", "Gurudaspur", "Moshinda", "Nazirpur", "Nurpur"]
                  },
                  {
                    "upazila": "Lalpur",
                    "unions": ["Arbab", "Arjunpur", "Bajitpur", "Durduria", "Ishwardi", "Kadam Rasul", "Lalpur", "Oalia", "Sonadanga"]
                  },
                  {
                    "upazila": "Singra",
                    "unions": ["Chamari", "Chaugram", "Dahia", "Hatiandaha", "Italy", "Kalam", "Lahoria", "Saila", "Singra", "Sukash"]
                  }
                ]
              },
              {
                "district": "Pabna",
                "upazilas": [
                  {
                    "upazila": "Pabna Sadar",
                    "unions": ["Ataikula", "Bhangura", "Dulai", "Haturia", "Hemayetpur", "Malanchi", "Pabna", "Puran Bharenga", "Sagarkandi"]
                  },
                  {
                    "upazila": "Atgharia",
                    "unions": ["Atgharia", "Debottar", "Ekdanta", "Lakshmikunda", "Majhpara", "Nimaichara", "Parshadanga"]
                  },
                  {
                    "upazila": "Bera",
                    "unions": ["Bera", "Chakla", "Ghoshnagar", "Kashinathpur", "Kutubpur", "Nandanga", "Paurashava", "Rajapur", "Sapahar"]
                  },
                  {
                    "upazila": "Bhangura",
                    "unions": ["Ashtamanisha", "Bhangura", "Dilpasar", "Pabna", "Puran Bharenga", "Shaharbati"]
                  },
                  {
                    "upazila": "Chatmohar",
                    "unions": ["Bilchalan", "Chatmohar", "Danthia", "Dhulauri", "Fulki", "Gunaigachha", "Handial", "Hatikumrul", "Paurashava", "Sahapur"]
                  },
                  {
                    "upazila": "Faridpur",
                    "unions": ["Banwarinagar", "Char Sadipur", "Faridpur", "Hadal", "Harirampur", "Kalam", "Krishnapur", "Majhpara"]
                  },
                  {
                    "upazila": "Ishwardi",
                    "unions": ["Dashuria", "Ishwardi", "Lakshmipur", "Muladuli", "Pakshi", "Sahapur", "Sara", "Swardi"]
                  },
                  {
                    "upazila": "Santhia",
                    "unions": ["Ataikula", "Bhangura", "Dulai", "Haturia", "Hemayetpur", "Malanchi", "Pabna", "Puran Bharenga", "Sagarkandi"]
                  },
                  {
                    "upazila": "Sujanagar",
                    "unions": ["Ataikula", "Bhangura", "Dulai", "Haturia", "Hemayetpur", "Malanchi", "Pabna", "Puran Bharenga", "Sagarkandi"]
                  }
                ]
              },
              {
                "district": "Rajshahi",
                "upazilas": [
                  {
                    "upazila": "Rajshahi Sadar",
                    "unions": ["Baganpara", "Baliapukur", "Bhadra", "Bhoberpara", "Dargapur", "Godagari", "Kazla", "Khodmohanpur", "Matikata", "Panchandar", "Putia", "Rajshahi", "Shyampur", "Tanor"]
                  },
                  {
                    "upazila": "Bagha",
                    "unions": ["Bagha", "Baharampur", "Bakshi", "Bhatora", "Gharinda", "Manigram", "Nimaichara", "Pachandar", "Pakuria"]
                  },
                  {
                    "upazila": "Bagmara",
                    "unions": ["Arani", "Bagmara", "Baharampur", "Bakshi", "Bhatora", "Gharinda", "Manigram", "Nimaichara", "Pachandar", "Pakuria"]
                  },
                  {
                    "upazila": "Charghat",
                    "unions": ["Charghat", "Dharmapur", "Gona", "Kalidashpur", "Lalpur", "Sarda", "Shibpur"]
                  },
                  {
                    "upazila": "Durgapur",
                    "unions": ["Durgapur", "Gogram", "Kalisahar", "Kashiadaha", "Kutubpur", "Maugachhi", "Nandanpur", "Parshadanga"]
                  },
                  {
                    "upazila": "Godagari",
                    "unions": ["Badhair", "Basudebpur", "Char Ashariadaha", "Dewpara", "Godagari", "Gogram", "Gokul", "Kashiadaha", "Matikata", "Mohanpur", "Palsa", "Rishikul"]
                  },
                  {
                    "upazila": "Mohanpur",
                    "unions": ["Baraigram", "Chanduria", "Gogram", "Kalidashpur", "Kashiadaha", "Kutubpur", "Mohanpur", "Pakhra", "Sardah"]
                  },
                  {
                    "upazila": "Paba",
                    "unions": ["Bagoan", "Bhabaniganj", "Haripur", "Kashiadaha", "Kutubpur", "Paba", "Puranpara", "Sardah", "Sreepur"]
                  },
                  {
                    "upazila": "Puthia",
                    "unions": ["Belpukuria", "Bhalukgachhi", "Darshanpara", "Dhopadaha", "Jewpara", "Puthia", "Shilmaria", "Sreemantapur"]
                  },
                  {
                    "upazila": "Tanore",
                    "unions": ["Badhair", "Bhadra", "Bhoberpara", "Dargapur", "Khodmohanpur", "Panchandar", "Putia", "Tanore"]
                  }
                ]
              },
              {
                "district": "Sirajganj",
                "upazilas": [
                  {
                    "upazila": "Sirajganj Sadar",
                    "unions": ["Bagbati", "Baghutia", "Bahu Jamuna", "Beltail", "Gala", "Ghurka", "Kaoakola", "Khasrajbari", "Mechhra", "Mechhra", "Ratankandi", "Saidabad", "Sirajganj", "Sohagpur"]
                  },
                  {
                    "upazila": "Belkuchi",
                    "unions": ["Belkuchi", "Bhangabari", "Dhangara", "Dhukuriabera", "Gailla", "Gala", "Hatikumrul", "Jhawail", "Kawkhali", "Rasulpur"]
                  },
                  {
                    "upazila": "Chauhali",
                    "unions": ["Badhair", "Gandail", "Khas Kasba", "Khas Pukuria", "Kumrabaria", "Salanga", "Sthal", "Swarupdahi"]
                  },
                  {
                    "upazila": "Kamarkhanda",
                    "unions": ["Bagutia", "Jamtail", "Jhaudia", "Kamarkhanda", "Nalka", "Naruamala", "Puranandapur", "Shuvgachha"]
                  },
                  {
                    "upazila": "Kazipur",
                    "unions": ["Kazipur", "Lahiri Para", "Monsur Nagar", "Natuarpara", "Nishchintapur", "Sonamukhi", "Subhagachha", "Sultanpur"]
                  },
                  {
                    "upazila": "Raiganj",
                    "unions": ["Bhadra", "Chandai", "Dhubil", "Durbadanga", "Elangi", "Kalam", "Kaoakola", "Raiganj", "Ramanath Khanpur", "Sabaik"]
                  },
                  {
                    "upazila": "Shahjadpur",
                    "unions": ["Gala", "Jamtail", "Jhaudia", "Kamarkhanda", "Nalka", "Naruamala", "Puranandapur", "Shahjadpur", "Shuvgachha"]
                  },
                  {
                    "upazila": "Tarash",
                    "unions": ["Baraigram", "Deshigram", "Dhapari", "Madhainagar", "Magura", "Maghan", "Mushuri", "Tarash"]
                  },
                  {
                    "upazila": "Ullahpara",
                    "unions": ["Bagbati", "Baghutia", "Bahu Jamuna", "Beltail", "Gala", "Ghurka", "Kaoakola", "Khasrajbari", "Mechhra", "Mechhra", "Ratankandi", "Saidabad", "Ullahpara"]
                  }
                ]
              }
            ]
          },
          {
            "division": "Rangpur",
            "districts": [
              {
                "district": "Dinajpur",
                "upazilas": [
                  {
                    "upazila": "Dinajpur Sadar",
                    "unions": ["Bilashbari", "Bohorgram", "Chatail", "Chehelgazi", "Fatehpur", "Kushdaha", "Masimpur", "Palsha", "Paurashava", "Sekhpura", "Shalkhuria", "Shekpura", "Singra"]
                  },
                  {
                    "upazila": "Birampur",
                    "unions": ["Birampur", "Pali", "Sekherkola", "Sundarpur", "Tazpur"]
                  },
                  {
                    "upazila": "Birganj",
                    "unions": ["Bherbheri", "Khanpur", "Kumarganj", "Mongalpur", "Nijpara", "Palashbari", "Paurashava", "Satair", "Shibnagar"]
                  },
                  {
                    "upazila": "Biral",
                    "unions": ["Afra", "Bhandara", "Biral", "Dhamoir", "Dharmapur", "Farakkabad", "Mallickpur", "Paurashava", "Ranihati", "Shibrampur"]
                  },
                  {
                    "upazila": "Bochaganj",
                    "unions": ["Bochaganj", "Bolla", "Ghashipara", "Maheshpur", "Majhpara", "Paurashava", "Satcha", "Shibpur"]
                  },
                  {
                    "upazila": "Chirirbandar",
                    "unions": ["Alokdihi", "Amarpur", "Chirirbandar", "Dangi", "Dharmapur", "Imadpur", "Paurashava", "Punatti", "Satnala", "Shibnagar"]
                  },
                  {
                    "upazila": "Phulbari",
                    "unions": ["Kashipur", "Mongalpur", "Mostofapur", "Phulbari", "Paurashava", "Tambulpur"]
                  },
                  {
                    "upazila": "Ghoraghat",
                    "unions": ["Alihat", "Bella", "Ghoraghat", "Palsa", "Paurashava"]
                  },
                  {
                    "upazila": "Hakimpur",
                    "unions": ["Alihapur", "Hakimpur", "Khattamadobpara", "Paurashava", "Sundarpur"]
                  },
                  {
                    "upazila": "Kaharole",
                    "unions": ["Aulia", "Dabar", "Kaharole", "Mukundapur", "Paurashava", "Rajarampur"]
                  },
                  {
                    "upazila": "Khansama",
                    "unions": ["Alambiditor", "Bherbheri", "Bherbheri", "Khansama", "Paurashava", "Rampur"]
                  },
                  {
                    "upazila": "Nawabganj",
                    "unions": ["Bhaduria", "Daudpur", "Dangipara", "Gopalpur", "Joypur", "Kushdaha", "Mulia", "Nawabganj", "Paurashava", "Shaharpara"]
                  },
                  {
                    "upazila": "Parbatipur",
                    "unions": ["Bhaduria", "Charabil", "Chhaparhat", "Jotbani", "Kumedpur", "Parbatipur", "Paurashava", "Rampur", "Sahapara"]
                  }
                ]
              },
              {
                "district": "Gaibandha",
                "upazilas": [
                  {
                    "upazila": "Gaibandha Sadar",
                    "unions": ["Badiakhali", "Ballamjhar", "Boali", "Ghuridaha", "Kamalerpara", "Kholahati", "Kuptala", "Lakshmipur", "Mollarchar", "Paurashava", "Ramchandrapur", "Sahapara", "Shaghata"]
                  },
                  {
                    "upazila": "Fulchhari",
                    "unions": ["Erendabari", "Fulchhari", "Kanchi", "Kanchibari", "Uria", "Zahidpur"]
                  },
                  {
                    "upazila": "Gobindaganj",
                    "unions": ["Bamandanga", "Dalbardia", "Gobindaganj", "Paurashava", "Mahimaganj", "Mohanpur", "Parbatipur", "Sapmara", "Shalkhuria"]
                  },
                  {
                    "upazila": "Palashbari",
                    "unions": ["Betkapa", "Haripur", "Kishoreganj", "Mahmudpur", "Palashbari", "Paurashava", "Rameshwarpur"]
                  },
                  {
                    "upazila": "Sadullapur",
                    "unions": ["Bhatra", "Damodarpur", "Dhaperhat", "Idilpur", "Kamarjani", "Naldanga", "Ratanpur", "Sadullapur"]
                  },
                  {
                    "upazila": "Sundarganj",
                    "unions": ["Bharatkhali", "Chandipur", "Chhaparhat", "Dahabanda", "Haripur", "Kanchibari", "Kapasia", "Paurashava", "Sarbananda", "Sonaroy", "Sundarganj"]
                  },
                  {
                    "upazila": "Saghata",
                    "unions": ["Bamandanga", "Bharatkhali", "Bonarpara", "Kamalerpara", "Kholahati", "Saghata", "Sapmara", "Talki"]
                  }
                ]
              },
              {
                "district": "Kurigram",
                "upazilas": [
                  {
                    "upazila": "Kurigram Sadar",
                    "unions": ["Bazra", "Belgachha", "Bhogdanga", "Ghogadaha", "Holokhana", "Jatrapur", "Kanthalbari", "Mogolbasa", "Paurashava", "Pandul", "Shimulbari"]
                  },
                  {
                    "upazila": "Bhurungamari",
                    "unions": ["Andharijhar", "Bangasonahat", "Bhurungamari", "Boldia", "Char Bhurungamari", "Paiker Chhara", "Paurashava", "Shilkhuri"]
                  },
                  {
                    "upazila": "Char Rajibpur",
                    "unions": ["Char Rajibpur", "Kodailkati", "Mogalhat"]
                  },
                  {
                    "upazila": "Chilmari",
                    "unions": ["Ashtamir Char", "Chilmari", "Nayerhat", "Paurashava", "Ramna", "Raniganj"]
                  },
                  {
                    "upazila": "Phulbari",
                    "unions": ["Bara Bhita", "Bhangamor", "Kashipur", "Naodanga", "Phulbari", "Paurashava", "Tajar", "Thetrai"]
                  },
                  {
                    "upazila": "Nageshwari",
                    "unions": ["Ballabher Khas", "Bamondanga", "Bherbheri", "Goral", "Kachakata", "Kaliganj", "Nageshwari", "Paurashava", "Ramkhana", "Royganj"]
                  },
                  {
                    "upazila": "Rajarhat",
                    "unions": ["Bidyananda", "Chakirpashar", "Chhinai", "Gharialdanga", "Nohali", "Rajarhat", "Paurashava", "Umarmajid"]
                  },
                  {
                    "upazila": "Raomari",
                    "unions": ["Adar", "Bamni", "Kodalkati", "Raomari", "Paurashava"]
                  },
                  {
                    "upazila": "Ulipur",
                    "unions": ["Buraburi", "Daldalia", "Dhamserni", "Dhangara", "Dhara", "Hatsherpur", "Pandul", "Paurashava", "Saheber Alga", "Thetkhana"]
                  }
                ]
              },
              {
                "district": "Lalmonirhat",
                "upazilas": [
                  {
                    "upazila": "Lalmonirhat Sadar",
                    "unions": ["Barobari", "Gokunda", "Kakina", "Khuniagachh", "Moghalhat", "Paurashava", "Paticapara", "Rajpur", "Tushbhandar"]
                  },
                  {
                    "upazila": "Aditmari",
                    "unions": ["Bhadai", "Bhelabari", "Durgapur", "Kamalabari", "Saptibari", "Sarpukur", "Palashi"]
                  },
                  {
                    "upazila": "Kaliganj",
                    "unions": ["Bhotemari", "Chalbala", "Goddimari", "Goral", "Kakina", "Madati", "Tushbhandar"]
                  },
                  {
                    "upazila": "Hatibandha",
                    "unions": ["Bamandanga", "Bhotebari", "Goddimari", "Gotamari", "Patika", "Paurashava", "Saniajan", "Singimari"]
                  },
                  {
                    "upazila": "Patgram",
                    "unions": ["Baura", "Bouderhat", "Dahagram", "Jagatber", "Kuchlibari", "Patgram", "Paurashava", "Sreerampur"]
                  }
                ]
              },
              {
                "district": "Nilphamari",
                "upazilas": [
                  {
                    "upazila": "Nilphamari Sadar",
                    "unions": ["Balapara", "Chaora Bargacha", "Chapra Saramjani", "Gorgram", "Itakumari", "Kachukata", "Khata Madhupur", "Lakshmi Chap", "Paurashava", "Palashbari", "Sonaray"]
                  },
                  {
                    "upazila": "Dimla",
                    "unions": ["Bamunia", "Dimla", "Gayabari", "Jhunagachh Chapani", "Khalisha Chapani", "Khoga Kharibari", "Naotara", "Paschim Chhatnay", "Tepa Kharibari"]
                  },
                  {
                    "upazila": "Domar",
                    "unions": ["Bamunia", "Bhogdabari", "Boxganj", "Deviganj", "Domar", "Paurashava", "Sonaray", "Sindurna"]
                  },
                  {
                    "upazila": "Jaldhaka",
                    "unions": ["Ballabher Khas", "Dharmapal", "Golmunda", "Golna", "Kaimari", "Kanthali", "Khalisha Chapani", "Paurashava", "Simulbari"]
                  },
                  {
                    "upazila": "Kishoreganj",
                    "unions": ["Chandkhana", "Garagram", "Kishoreganj", "Magura", "Nitai", "Putimari", "Ranachandi"]
                  },
                  {
                    "upazila": "Saidpur",
                    "unions": ["Bangalipur", "Bhotor", "Kamarpara", "Kushdaha", "Paurashava"]
                  }
                ]
              },
              {
                "district": "Panchagarh",
                "upazilas": [
                  {
                    "upazila": "Panchagarh Sadar",
                    "unions": ["Amarkhana", "Chaklahat", "Hafizabad", "Haribhasa", "Kamat Kajal Dighi", "Magura", "Panchagarh", "Paurashava", "Satmara"]
                  },
                  {
                    "upazila": "Atwari",
                    "unions": ["Alowa Khowa", "Bhogdabari", "Dharmagarh", "Kamarpara", "Mirzapur", "Radhanagar", "Teligati"]
                  },
                  {
                    "upazila": "Boda",
                    "unions": ["Boda", "Bhadreshwar", "Jhalaishalsiri", "Kajal Dighi", "Moidan", "Paurashava", "Saldanga"]
                  },
                  {
                    "upazila": "Debiganj",
                    "unions": ["Bhandar", "Dandapal", "Debiganj", "Paurashava", "Sona Haripur", "Sundardighi", "Tepriganj"]
                  },
                  {
                    "upazila": "Tetulia",
                    "unions": ["Buraburi", "Damdama", "Paurashava", "Shalbahan", "Tentulia", "Tirnai"]
                  }
                ]
              },
              {
                "district": "Rangpur",
                "upazilas": [
                  {
                    "upazila": "Rangpur Sadar",
                    "unions": ["Chandanpat", "Darshana", "Haridebpur", "Mominpur", "Pashuram", "Paurashava", "Pirgachha", "Pirganj", "Satgara", "Shahidbag", "Tepamodhupur"]
                  },
                  {
                    "upazila": "Badarganj",
                    "unions": ["Badarganj", "Bishnupur", "Gopalpur", "Gohailbari", "Kafrikhal", "Kellabandho", "Maidanpara", "Paurashava", "Radhanagar"]
                  },
                  {
                    "upazila": "Gangachara",
                    "unions": ["Alamnagar", "Bella", "Gajaghanta", "Gangachara", "Khaleya", "Kolkonda", "Lakshmitari", "Moinpur", "Paurashava", "Payrabond"]
                  },
                  {
                    "upazila": "Kaunia",
                    "unions": ["Bara Alampur", "Haragachh", "Hossainpur", "Kursha", "Paurashava", "Shahidbag", "Tepamodhupur"]
                  },
                  {
                    "upazila": "Mithapukur",
                    "unions": ["Bara Alampur", "Barabil", "Bhangni", "Durgapur", "Emadpur", "Kafrikhal", "Mithapukur", "Paurashava", "Payrabond", "Pirpur"]
                  },
                  {
                    "upazila": "Pirgachha",
                    "unions": ["Annodanagar", "Kalyani", "Kandi", "Kaulipara", "Moidan", "Pirgachha", "Paurashava", "Saroqpur", "Tambulpur"]
                  },
                  {
                    "upazila": "Pirganj",
                    "unions": ["Bara Alampur", "Bara Dargah", "Bhendabari", "Kabilpur", "Mithapukur", "Pirganj", "Paurashava", "Ramnathpur", "Roypur"]
                  },
                  {
                    "upazila": "Taraganj",
                    "unions": ["Alamnagar", "Ekarchali", "Hariarkuti", "Kurshatara", "Moyenpur", "Paurashava", "Sayar"]
                  }
                ]
              },
              {
                "district": "Thakurgaon",
                "upazilas": [
                  {
                    "upazila": "Thakurgaon Sadar",
                    "unions": ["Akhanagar", "Akcha", "Bakua", "Balia", "Baragaon", "Chilarang", "Debipur", "Gareya", "Jamalpur", "Paurashava", "Rahimanpur", "Rajagaon", "Roypur", "Ruhea", "Salandar"]
                  },
                  {
                    "upazila": "Baliadangi",
                    "unions": ["Amjankhore", "Bara Palashbari", "Bhanor", "Chandipur", "Dhantala", "Duosuo", "Paurashava", "Sadullahpur"]
                  },
                  {
                    "upazila": "Haripur",
                    "unions": ["Amgaon", "Bhaturia", "Dharmagarh", "Haripur", "Paurashava", "Saniajan", "Shatail"]
                  },
                  {
                    "upazila": "Pirganj",
                    "unions": ["Bairchuna", "Bhomradaha", "Burail", "Hajipur", "Jabarhat", "Kabilpur", "Kumedpur", "Pirganj", "Paurashava", "Ruhia", "Saidpur"]
                  },
                  {
                    "upazila": "Ranisankail",
                    "unions": ["Aloakhowa", "Bachor", "Dangipara", "Hossainpur", "Kabilpur", "Khoragachh", "Lehemba", "Nekmarad", "Paurashava", "Pirganj", "Roypur"]
                  }
                ]
              }
            ]
          },
          {
            "division": "Sylhet",
            "districts": [
                {
                    "district": "Habiganj",
                    "upazilas": [
                        {
                            "upazila": "Habiganj Sadar",
                            "unions": ["Habiganj Paurashava", "Laskarpur", "Laskarpur", "Bottamai", "Shayestaganj", "Gopaya", "Dhuliakhal", "Nizampur", "Purbanagar", "Nijampur", "Teghoria", "Raziura"]
                        },
                        {
                            "upazila": "Ajmiriganj",
                            "unions": ["Ajmiriganj Paurashava", "Ajmiriganj", "Badalpur", "Jalsukha", "Kakailseo", "Shibpasha"]
                        },
                        {
                            "upazila": "Baniachang",
                            "unions": ["Baniachang Paurashava", "Baniachang", "Karab", "Lakhai", "Baribanka", "Kadirpur", "Shatiajuri", "Sujatpur", "Daulatpur", "Mandari"]
                        },
                        {
                            "upazila": "Bahubal",
                            "unions": ["Bahubal Paurashava", "Bahubal", "Bhadeshwar", "Lamatashi", "Putijuri", "Satkapan", "Shibpasha"]
                        },
                        {
                            "upazila": "Chunarughat",
                            "unions": ["Chunarughat Paurashava", "Chunarughat", "Deorgachh", "Gopaya", "Mirahi", "Sankhola", "Shatiajuri"]
                        },
                        {
                            "upazila": "Lakhai",
                            "unions": ["Lakhai", "Murakari", "Bamai", "Karab", "Krishnapur", "Muriauk", "Raziura"]
                        },
                        {
                            "upazila": "Madhabpur",
                            "unions": ["Madhabpur Paurashava", "Madhabpur", "Bahubal", "Bulla", "Chowmohani", "Itakhola", "Jagadishpur", "Snanghat"]
                        },
                        {
                            "upazila": "Nabiganj",
                            "unions": ["Nabiganj Paurashava", "Nabiganj", "Bausha", "Debpara", "Dighalbak", "Kalerkan", "Kusiura", "Paniunda", "Inathganj", "Satkapan"]
                        }
                    ]
                },
                {
                    "district": "Moulvibazar",
                    "upazilas": [
                        {
                            "upazila": "Moulvibazar Sadar",
                            "unions": ["Moulvibazar Paurashava", "Amtail", "Chandighat", "Monumukh", "Kadamhata", "Khalilpur", "Krishnanagar", "Kamalpur", "Munshi Bazar", "Rajnagar"]
                        },
                        {
                            "upazila": "Barlekha",
                            "unions": ["Barlekha Paurashava", "Barlekha", "Dakshin Shahabajpur", "Sujanagar", "Talimpur", "Barni", "Dhakkhinbag", "Juri", "Purbashahabajpur"]
                        },
                        {
                            "upazila": "Juri",
                            "unions": ["Juri Paurashava", "Fultala", "Giasnagar", "Juri", "Sagarnal", "Fenchuganj", "Aushkandi"]
                        },
                        {
                            "upazila": "Kamalganj",
                            "unions": ["Kamalganj Paurashava", "Kamalganj", "Madhabpur", "Patrakhola", "Rahimpur", "Shamshernagar", "Adampur", "Islampur"]
                        },
                        {
                            "upazila": "Kulaura",
                            "unions": ["Kulaura Paurashava", "Kulaura", "Baramchal", "Bhanugachh", "Kajaldhara", "Rauthgaon", "Tilagaon", "Prithimpassa", "Sharifpur"]
                        },
                        {
                            "upazila": "Rajnagar",
                            "unions": ["Rajnagar Paurashava", "Rajnagar", "Tengra", "Manumukh", "Kamarchak", "Kormodha", "Munshebag"]
                        },
                        {
                            "upazila": "Sreemangal",
                            "unions": ["Sreemangal Paurashava", "Sreemangal", "Kalapur", "Kalighat", "Mirzapur", "Rajkandi", "Satgaon", "Ashidron", "Sindurkhan"]
                        }
                    ]
                },
                {
                    "district": "Sunamganj",
                    "upazilas": [
                        {
                            "upazila": "Sunamganj Sadar",
                            "unions": ["Sunamganj Paurashava", "Pogla", "Jahangirnagar", "Katair", "Lakshmansree", "Mohanpur", "Mollahpara", "Rangar Char", "Surma", "Durgapasha"]
                        },
                        {
                            "upazila": "Bishwamvarpur",
                            "unions": ["Bishwamvarpur", "Dakshin Badeghew", "Dakshin Ranikhai", "Purbadhala", "Uttar Badeghew", "Uttar Ranikhai"]
                        },
                        {
                            "upazila": "Chhatak",
                            "unions": ["Chhatak Paurashava", "Chhatak", "Chhaila Afjalabad", "Dolarbazar", "Gobindganj-Syedergaon", "Jawar", "Khurma", "Noarai", "Singchapair"]
                        },
                        {
                            "upazila": "Derai",
                            "unions": ["Derai Paurashava", "Derai", "Jagaddal", "Karimpur", "Kulanj", "Rafinagar", "Taral", "Tukerbazar"]
                        },
                        {
                            "upazila": "Dharampasha",
                            "unions": ["Dharampasha", "Bhubanabad", "Joykalash", "Pailgaon", "Patali", "Shakhigarh", "Uttar Badeghew"]
                        },
                        {
                            "upazila": "Dowarabazar",
                            "unions": ["Dowarabazar Paurashava", "Dowarabazar", "Bangla Bazar", "Bongshikunda", "Chamardani", "Fatehpur", "Lakshmipur", "Mannargaon", "Pandergaon"]
                        },
                        {
                            "upazila": "Jagannathpur",
                            "unions": ["Jagannathpur Paurashava", "Jagannathpur", "Asharkandi", "Badaghat", "Gobindganj", "Haldipur", "Kaliarbhanga", "Pailgaon", "Raniganj"]
                        },
                        {
                            "upazila": "Jamalganj",
                            "unions": ["Jamalganj", "Atuajan", "Fatehpur", "Shakherpur", "Sachna", "Beheli", "Patli"]
                        },
                        {
                            "upazila": "Sullah",
                            "unions": ["Sullah", "Atgaon", "Chhatian", "Kalian", "Kalian", "Manikpur", "Sullah", "Tekerhat"]
                        },
                        {
                            "upazila": "Tahirpur",
                            "unions": ["Tahirpur", "Balijuri", "Dharmapasha", "Jawar", "Kalian", "Pailgaon", "Sachna", "Tahirpur"]
                        }
                    ]
                },
                {
                    "district": "Sylhet",
                    "upazilas": [
                        {
                            "upazila": "Sylhet Sadar",
                            "unions": ["Sylhet Paurashava", "Tilaghor", "Moglabazar", "Mazarpur", "Khadimnagar", "Jalalabad", "Shahporan", "Khadimpara", "Tuker Bazar", "Mandalpur"]
                        },
                        {
                            "upazila": "Beanibazar",
                            "unions": ["Beanibazar Paurashava", "Beanibazar", "Kurarbazar", "Lalabazar", "Lama Kazi", "Charkhai", "Dewlabazar", "Kushighat"]
                        },
                        {
                            "upazila": "Bishwanath",
                            "unions": ["Bishwanath Paurashava", "Bishwanath", "Doshghar", "Daulatpur", "Deokalas", "Alankari", "Lama Kazi", "Rampasha"]
                        },
                        {
                            "upazila": "Companiganj",
                            "unions": ["Companiganj Paurashava", "Companiganj", "Islampur", "Ranikhai", "Salia", "Paschim Gauripur", "Purba Gauripur"]
                        },
                        {
                            "upazila": "Fenchuganj",
                            "unions": ["Fenchuganj Paurashava", "Fenchuganj", "Uttar Fenchuganj", "Dakshin Fenchuganj", "Uttar Kushiara", "Dakshin Kushiara"]
                        },
                        {
                            "upazila": "Golapganj",
                            "unions": ["Golapganj Paurashava", "Golapganj", "Fulbari", "Lakshmi Prasad", "Budhbaribazar", "Dhakadakshin", "Fatehpur", "West Amura"]
                        },
                        {
                            "upazila": "Gowainghat",
                            "unions": ["Gowainghat", "Alirgaon", "Fatehpur", "Lengura", "Nandirgaon", "Paschim Jaflong", "Purba Jaflong", "Rustampur"]
                        },
                        {
                            "upazila": "Jaintiapur",
                            "unions": ["Jaintiapur Paurashava", "Jaintiapur", "Charikatha", "Darbast", "Fatehpur", "Jaintapur", "Nijpat", "Kandigaon"]
                        },
                        {
                            "upazila": "Kanaighat",
                            "unions": ["Kanaighat Paurashava", "Kanaighat", "Bara Chatul", "Dakhsin Banigram", "Jinghabari", "Paschim Lakshmi Prasad", "Purba Lakshmi Prasad", "Rajaganj"]
                        },
                        {
                            "upazila": "Osmani Nagar",
                            "unions": ["Osmani Nagar", "Burunga", "Dewan Bazar", "Osmaninagar", "Pashchim Pailanpur", "Purba Pailanpur", "Rampasha", "Tilpara"]
                        },
                        {
                            "upazila": "Zakiganj",
                            "unions": ["Zakiganj Paurashava", "Zakiganj", "Barahal", "Kasaibari", "Kholachhara", "Manikpur", "Sultanpur", "Shibpasha"]
                        }
                    ]
                }
            ]
        }
    ]
