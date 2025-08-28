// geo-data
export interface District {
    district: string
    upazilas: string[]
}

export interface Division {
    division: string
    districts: District[]
}

export const bangladeshGeoData: Division[] = [

    {
        "division": "Barishal",
        "districts": [
            {
                "district": "Barguna",
                "upazilas": ["Amtali", "Bamna", "Barguna Sadar", "Betagi", "Patharghata", "Taltali"]
            },
            {
                "district": "Barishal",
                "upazilas": ["Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Barishal Sadar", "Gournadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"]
            },
            {
                "district": "Bhola",
                "upazilas": ["Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"]
            },
            {
                "district": "Jhalokathi",
                "upazilas": ["Jhalokathi Sadar", "Kathalia", "Nalchity", "Rajapur"]
            },
            {
                "district": "Patuakhali",
                "upazilas": ["Bauphal", "Dashmina", "Dumki", "Galachipa", "Kalapara", "Mirzaganj", "Patuakhali Sadar", "Rangabali"]
            },
            {
                "district": "Pirojpur",
                "upazilas": ["Bhandaria", "Kaukhali", "Mathbaria", "Nazirpur", "Nesarabad", "Pirojpur Sadar", "Zianagar"]
            }
        ]
    },
    {
        "division": "Chattogram",
        "districts": [
            {
                "district": "Bandarban",
                "upazilas": ["Bandarban Sadar", "Ali Kadam", "Rowangchhari", "Ruma", "Thanchi", "Naikhongchhari", "Lama"]
            },
            {
                "district": "Brahmanbaria",
                "upazilas": ["Brahmanbaria Sadar", "Ashuganj", "Bancharampur", "Bijoynagar", "Kasba", "Nabinagar", "Nasirnagar", "Sarail", "Shahbazpur"]
            },
            {
                "district": "Chandpur",
                "upazilas": ["Chandpur Sadar", "Faridganj", "Haimchar", "Hajiganj", "Kachua", "Matlab Uttar", "Matlab Dakshin", "Shahrasti"]
            },
            {
                "district": "Chattogram",
                "upazilas": [ "Cahttogram", "Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari", "Hathazari", "Lohagara", "Mirsharai", "Patiya", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda"]
            },
            {
                "district": "Cox's Bazar",
                "upazilas": ["Chakaria", "Cox's Bazar Sadar", "Eidgaon", "Kutubdia", "Maheshkhali", "Ramu", "Teknaf", "Ukhia", "Pekua"]
            },
            {
                "district": "Comilla",
                "upazilas": ["Barura", "Brahmanpara", "Burichang", "Chandina", "Chauddagram", "Daudkandi", "Debidwar", "Homna", "Comilla Sadar Dakshin", "Comilla Sadar", "Laksam", "Monohorgonj", "Meghna", "Muradnagar", "Nangalkot", "Titas"]
            },
            {
                "district": "Feni",
                "upazilas": ["Chhagalnaiya", "Daganbhuiyan", "Feni Sadar", "Parshuram", "Sonagazi", "Fulgazi"]
            },
            {
                "district": "Khagrachhari",
                "upazilas": ["Khagrachhari Sadar", "Dighinala", "Panchhari", "Laxmichhari", "Mohalchhari", "Manikchhari", "Ramgarh", "Matiranga", "Guimara"]
            },
            {
                "district": "Lakshmipur",
                "upazilas": ["Lakshmipur Sadar", "Raipur", "Ramganj", "Ramgati", "Komol Nagar"]
            },
            {
                "district": "Noakhali",
                "upazilas": ["Noakhali Sadar", "Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Senbagh", "Sonaimuri", "Subarnachar", "Kabirhat"]
            },
            {
                "district": "Rangamati",
                "upazilas": ["Rangamati Sadar", "Belaichhari", "Bagaichhari", "Barkal", "Juraichhari", "Rajasthali", "Kaptai", "Langadu", "Nannerchar", "Kaukhali"]
            }
        ]
    },
    {
        "division": "Dhaka",
        "districts": [
            {
                "district": "Dhaka",
                "upazilas": ["Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar"]
            },
            {
                "district": "Faridpur",
                "upazilas": ["Faridpur Sadar", "Alfadanga", "Boalmari", "Sadarpur", "Nagarkanda", "Bhanga", "Charbhadrasan", "Madhukhali", "Saltha"]
            },
            {
                "district": "Gazipur",
                "upazilas": ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"]
            },
            {
                "district": "Gopalganj",
                "upazilas": ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"]
            },
            {
                "district": "Kishoreganj",
                "upazilas": ["Kishoreganj Sadar", "Austagram", "Bajitpur", "Bhairab", "Hossainpur", "Itna", "Karimganj", "Katiadi", "Nikli", "Pakundia", "Tarail"]
            },
            {
                "district": "Madaripur",
                "upazilas": ["Madaripur Sadar", "Kalkini", "Rajoir", "Shibchar"]
            },
            {
                "district": "Manikganj",
                "upazilas": ["Manikganj Sadar", "Singair", "Shibalaya", "Saturia", "Harirampur", "Ghior", "Daulatpur"]
            },
            {
                "district": "Munshiganj",
                "upazilas": ["Munshiganj Sadar", "Lohajang", "Sreenagar", "Sirajdikhan", "Tongibari", "Gazaria"]
            },
            {
                "district": "Narayanganj",
                "upazilas": ["Narayanganj Sadar", "Araihazar", "Bandar", "Rupganj", "Sonargaon"]
            },
            {
                "district": "Narsingdi",
                "upazilas": ["Narsingdi Sadar", "Belabo", "Monohardi", "Palash", "Raipura", "Shibpur"]
            },
            {
                "district": "Rajbari",
                "upazilas": ["Rajbari Sadar", "Baliakandi", "Goalandaghat", "Pangsha", "Kalukhali"]
            },
            {
                "district": "Shariatpur",
                "upazilas": ["Shariatpur Sadar", "Naria", "Zajira", "Gosairhat", "Bhedarganj", "Damudya"]
            },
            {
                "district": "Tangail",
                "upazilas": ["Tangail Sadar", "Sakhipur", "Basail", "Madhupur", "Ghatail", "Kalihati", "Nagarpur", "Mirzapur", "Gopalpur", "Delduar", "Bhuapur", "Dhanbari"]
            }
        ]
    },
    {
        "division": "Khulna",
        "districts": [
            {
                "district": "Bagerhat",
                "upazilas": ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"]
            },
            {
                "district": "Chuadanga",
                "upazilas": ["Chuadanga Sadar", "Alamdanga", "Damurhuda", "Jibannagar"]
            },
            {
                "district": "Jessore",
                "upazilas": ["Jessore Sadar", "Abhaynagar", "Bagherpara", "Chaugachha", "Jhikargachha", "Keshabpur", "Manirampur", "Sharsha"]
            },
            {
                "district": "Jhenaidah",
                "upazilas": ["Jhenaidah Sadar", "Maheshpur", "Kaliganj", "Kotchandpur", "Shailkupa", "Harinakunda"]
            },
            {
                "district": "Khulna",
                "upazilas": ["Khulna Sadar", "Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra", "Paikgachha", "Phultala", "Rupsa", "Terokhada"]
            },
            {
                "district": "Kushtia",
                "upazilas": ["Kushtia Sadar", "Kumarkhali", "Khoksa", "Mirpur", "Daulatpur", "Bheramara"]
            },
            {
                "district": "Magura",
                "upazilas": ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"]
            },
            {
                "district": "Meherpur",
                "upazilas": ["Meherpur Sadar", "Gangni", "Mujibnagar"]
            },
            {
                "district": "Narail",
                "upazilas": ["Narail Sadar", "Kalia", "Lohagara"]
            },
            {
                "district": "Satkhira",
                "upazilas": ["Satkhira Sadar", "Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Shyamnagar", "Tala"]
            }
        ]
    },
    {
        "division": "Mymensingh",
        "districts": [
            {
                "district": "Jamalpur",
                "upazilas": ["Jamalpur Sadar", "Bakshiganj", "Dewanganj", "Islampur", "Madarganj", "Melandaha", "Sarishabari"]
            },
            {
                "district": "Mymensingh",
                "upazilas": ["Mymensingh Sadar", "Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha", "Nandail", "Phulpur", "Trishal"]
            },
            {
                "district": "Netrokona",
                "upazilas": ["Netrokona Sadar", "Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kendua", "Madan", "Mohanganj", "Purbadhala"]
            },
            {
                "district": "Sherpur",
                "upazilas": ["Sherpur Sadar", "Jhenaigati", "Nakla", "Nalitabari", "Sreebardi"]
            }
        ]
    },
    {
        "division": "Rajshahi",
        "districts": [
            {
                "district": "Bogura",
                "upazilas": ["Bogura Sadar", "Adamdighi", "Dhunat", "Dhupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Sherpur", "Shibganj", "Sonatala"]
            },
            {
                "district": "Chapai Nawabganj",
                "upazilas": ["Chapai Nawabganj Sadar", "Bholahat", "Gomastapur", "Nachole", "Shibganj"]
            },
            {
                "district": "Joypurhat",
                "upazilas": ["Joypurhat Sadar", "Akkelpur", "Kalai", "Khetlal", "Panchbibi"]
            },
            {
                "district": "Naogaon",
                "upazilas": ["Naogaon Sadar", "Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Mohadevpur", "Niamatpur", "Patnitala", "Porsha", "Raninagar", "Sapahar"]
            },
            {
                "district": "Natore",
                "upazilas": ["Natore Sadar", "Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Singra"]
            },
            {
                "district": "Pabna",
                "upazilas": ["Pabna Sadar", "Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Santhia", "Sujanagar"]
            },
            {
                "district": "Rajshahi",
                "upazilas": ["Rajshahi Sadar", "Bagha", "Bagmara", "Charghat", "Durgapur", "Godagari", "Mohanpur", "Paba", "Puthia", "Tanore"]
            },
            {
                "district": "Sirajganj",
                "upazilas": ["Sirajganj Sadar", "Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur", "Tarash", "Ullahpara"]
            }
        ]
    },
    {
        "division": "Rangpur",
        "districts": [
            {
                "district": "Dinajpur",
                "upazilas": ["Dinajpur Sadar", "Birampur", "Birganj", "Biral", "Bochaganj", "Chirirbandar", "Phulbari", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur"]
            },
            {
                "district": "Gaibandha",
                "upazilas": ["Gaibandha Sadar", "Fulchhari", "Gobindaganj", "Palashbari", "Sadullapur", "Sundarganj", "Saghata"]
            },
            {
                "district": "Kurigram",
                "upazilas": ["Kurigram Sadar", "Bhurungamari", "Char Rajibpur", "Chilmari", "Phulbari", "Nageshwari", "Rajarhat", "Raomari", "Ulipur"]
            },
            {
                "district": "Lalmonirhat",
                "upazilas": ["Lalmonirhat Sadar", "Aditmari", "Kaliganj", "Hatibandha", "Patgram"]
            },
            {
                "district": "Nilphamari",
                "upazilas": ["Nilphamari Sadar", "Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Saidpur"]
            },
            {
                "district": "Panchagarh",
                "upazilas": ["Panchagarh Sadar", "Atwari", "Boda", "Debiganj", "Tetulia"]
            },
            {
                "district": "Rangpur",
                "upazilas": ["Rangpur Sadar", "Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Taraganj"]
            },
            {
                "district": "Thakurgaon",
                "upazilas": ["Thakurgaon Sadar", "Baliadangi", "Haripur", "Pirganj", "Ranisankail"]
            }
        ]
    },
    {
        "division": "Sylhet",
        "districts": [
            {
                "district": "Habiganj",
                "upazilas": ["Habiganj Sadar", "Ajmiriganj", "Baniachang", "Bahubal", "Chunarughat", "Lakhai", "Madhabpur", "Nabiganj"]
            },
            {
                "district": "Moulvibazar",
                "upazilas": ["Moulvibazar Sadar", "Barlekha", "Juri", "Kamalganj", "Kulaura", "Rajnagar", "Sreemangal"]
            },
            {
                "district": "Sunamganj",
                "upazilas": ["Sunamganj Sadar", "Bishwamvarpur", "Chhatak", "Derai", "Dharampasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Sullah", "Tahirpur"]
            },
            {
                "district": "Sylhet",
                "upazilas": ["Sylhet Sadar", "Beanibazar", "Bishwanath", "Companiganj", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Osmani Nagar", "Zakiganj"]
            }
        ]
    }
]
