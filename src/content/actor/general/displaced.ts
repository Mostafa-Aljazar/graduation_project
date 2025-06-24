// import { displacedResponse } from "@/@types/actors/general/displaceds/displacesResponse.type";

// export const ALL_DISPLACED: displacedResponse = {
//     "status": "success",
//     "message": "تم استرجاع بيانات النازحين بنجاح",
//     "displaceds": [
//         {
//             "id": "D001",
//             "name": "محمد أحمد خالد محمود",
//             "identity": "ID-123456",
//             "tent": "خيمة-أ01",
//             "family_number": 5,
//             "mobile_number": "+970599123456",
//             "delegate": {
//                 "id": "DEL001",
//                 "name": "عبدالله حسن عمر سعيد"
//             }
//         },
//         {
//             "id": "D002",
//             "name": "فاطمة صالح محمد إبراهيم",
//             "identity": "ID-123457",
//             "tent": "خيمة-أ02",
//             "family_number": 4,
//             "mobile_number": "+970598123457",
//             "delegate": {
//                 "id": "DEL002",
//                 "name": "خديجة يوسف عبدالرحمن ناصر"
//             }
//         },
//         {
//             "id": "D003",
//             "name": "يوسف عمر عبدالعزيز فهد",
//             "identity": "ID-123458",
//             "tent": "خيمة-أ03",
//             "family_number": 6,
//             "mobile_number": "+970597123458",
//             "delegate": {
//                 "id": "DEL003",
//                 "name": "علي إبراهيم خالد مشاري"
//             }
//         },
//         {
//             "id": "D004",
//             "name": "مريم ناصر سعود عبدالكريم",
//             "identity": "ID-123459",
//             "tent": "خيمة-ب01",
//             "family_number": 3,
//             "mobile_number": "+970595123459",
//             "delegate": {
//                 "id": "DEL004",
//                 "name": "زينب عبدالله صالح راشد"
//             }
//         },
//         {
//             "id": "D005",
//             "name": "خالد محمود حسن طارق",
//             "identity": "ID-123460",
//             "tent": "خيمة-ب02",
//             "family_number": 7,
//             "mobile_number": "+970594123460",
//             "delegate": {
//                 "id": "DEL005",
//                 "name": "عائشة عمر محمد سليمان"
//             }
//         },
//         {
//             "id": "D006",
//             "name": "ليلى عبدالرحمن فهد ياسر",
//             "identity": "ID-123461",
//             "tent": "خيمة-ب03",
//             "family_number": 2,
//             "mobile_number": "+970592123461",
//             "delegate": {
//                 "id": "DEL006",
//                 "name": "ريم ناصر عبدالعزيز بدر"
//             }
//         },
//         {
//             "id": "D007",
//             "name": "حسن طارق عبدالله نواف",
//             "identity": "ID-123462",
//             "tent": "خيمة-ج01",
//             "family_number": 8,
//             "mobile_number": "+970591123462",
//             "delegate": {
//                 "id": "DEL007",
//                 "name": "سامي محمد صالح رائد"
//             }
//         },
//         {
//             "id": "D008",
//             "name": "نورة بدر محمد سلطان",
//             "identity": "ID-123463",
//             "tent": "خيمة-ج02",
//             "family_number": 4,
//             "mobile_number": "+970599123463",
//             "delegate": {
//                 "id": "DEL008",
//                 "name": "مها عبدالكريم حسن عمر"
//             }
//         },
//         {
//             "id": "D009",
//             "name": "أحمد راشد عبدالرحمن فيصل",
//             "identity": "ID-123464",
//             "tent": "خيمة-ج03",
//             "family_number": 5,
//             "mobile_number": "+970598123464",
//             "delegate": {
//                 "id": "DEL009",
//                 "name": "عمر بندر خالد إبراهيم"
//             }
//         },
//         {
//             "id": "D010",
//             "name": "زينب فيصل سعيد نايف",
//             "identity": "ID-123465",
//             "tent": "خيمة-د01",
//             "family_number": 6,
//             "mobile_number": "+970597123465",
//             "delegate": {
//                 "id": "DEL010",
//                 "name": "سارة ياسر عبدالله محمود"
//             }
//         },
//         {
//             "id": "D011",
//             "name": "عبدالرحمن نايف عمر مشاري",
//             "identity": "ID-123466",
//             "tent": "خيمة-د02",
//             "family_number": 3,
//             "mobile_number": "+970595123466",
//             "delegate": {
//                 "id": "DEL011",
//                 "name": "خالد تركي صالح عبدالرحمن"
//             }
//         },
//         {
//             "id": "D012",
//             "name": "نور عبدالكريم حسن راشد",
//             "identity": "ID-123467",
//             "tent": "خيمة-د03",
//             "family_number": 4,
//             "mobile_number": "+970594123467",
//             "delegate": {
//                 "id": "DEL012",
//                 "name": "فاطمة سليمان محمد ناصر"
//             }
//         },
//         {
//             "id": "D013",
//             "name": "سعد مشاري عبدالله فهد",
//             "identity": "ID-123468",
//             "tent": "خيمة-هـ01",
//             "family_number": 5,
//             "mobile_number": "+970592123468",
//             "delegate": {
//                 "id": "DEL013",
//                 "name": "فارس سليمان حسن يوسف"
//             }
//         },
//         {
//             "id": "D014",
//             "name": "هدى سلطان محمد إبراهيم",
//             "identity": "ID-123469",
//             "tent": "خيمة-هـ02",
//             "family_number": 6,
//             "mobile_number": "+970591123469",
//             "delegate": {
//                 "id": "DEL014",
//                 "name": "إيمان عبدالمجيد عمر سعيد"
//             }
//         },
//         {
//             "id": "D015",
//             "name": "فهد متعب عبدالرحمن خالد",
//             "identity": "ID-123470",
//             "tent": "خيمة-هـ03",
//             "family_number": 4,
//             "mobile_number": "+970599123470",
//             "delegate": {
//                 "id": "DEL015",
//                 "name": "عبدالملك رائد محمد صالح"
//             }
//         }
//     ],
//     "pagination": {
//         "page": 1,
//         "limit": 15,
//         "totalItems": 70,
//         "totalPages": 5
//     }
// }