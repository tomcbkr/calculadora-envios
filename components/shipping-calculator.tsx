"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Search, Plus, Minus, Trash2, Package, Truck, Save, History, X, CheckCircle } from "lucide-react"

// Product data sorted alphabetically
const products = [
  { sku: "P488845", name: "baby bunker 3L sin fondo", weight: 0.4, volume: 0.000162 },
  { sku: "P1153981", name: "bandeja de riego 1x1", weight: 0, volume: 0.05415 },
  { sku: "1010", name: "biochar - 14L", weight: 6.6, volume: 0.018928 },
  { sku: "1", name: "biochar - 25L", weight: 12.5, volume: 0.036 },
  { sku: "1009", name: "biochar - 5L", weight: 2.4, volume: 0.008379 },
  { sku: "biochar25bolsa", name: "biochar bolsa 25L", weight: 10, volume: 0.016 },
  { sku: "P702773", name: "bunker 100L", weight: 0.33, volume: 0.01512 },
  { sku: "P235770", name: "bunker 160L", weight: 1.05, volume: 0.0099 },
  { sku: "P702769", name: "bunker 200L", weight: 1.15, volume: 0.04256 },
  { sku: "P235769", name: "bunker 250L", weight: 1.14, volume: 0.0099 },
  { sku: "P462659", name: "bunker 350L", weight: 5, volume: 0.064125 },
  { sku: "P306758", name: "bunker 50L", weight: 0.38, volume: 0.00828 },
  { sku: "P490320", name: "bunker 700L", weight: 6, volume: 0.064125 },
  { sku: "cascarilla20", name: "cascarilla 20L", weight: 2.5, volume: 0.004 },
  { sku: "1027", name: "cascarilla de arroz 100L", weight: 11.5, volume: 0.0875 },
  { sku: "1026", name: "cascarilla de arroz 50L", weight: 6, volume: 0.0375 },
  { sku: "1011", name: "compost artesanal organico - 30L", weight: 14, volume: 0.018 },
  { sku: "1005", name: "cover crop 11 - 180GR", weight: 0.2, volume: 0.0003 },
  { sku: "1006", name: "cover crop 11 - 1KG", weight: 1, volume: 0.002288 },
  { sku: "1004", name: "em5 - 1L", weight: 1, volume: 0.001274 },
  { sku: "1003", name: "em5 - 250ML", weight: 0.28, volume: 0.000375 },
  { sku: "P510752", name: "fermentadora biochar 45L", weight: 18, volume: 0.0578 },
  { sku: "P587048", name: "fermentadora kashi mix 45L", weight: 23, volume: 0.0578 },
  { sku: "fibra30", name: "fibra de coco jiffy con chips 30L", weight: 2.5, volume: 0.0045 },
  { sku: "1019", name: "fibra de coco jiffy con chips 50L", weight: 3, volume: 0.00792 },
  { sku: "P839790", name: "fibra de coco jiffy con chips 70L", weight: 4.8, volume: 0.009 },
  { sku: "P691741", name: "fibra de coco jiffy fino 70L", weight: 4.8, volume: 0.009 },
  { sku: "1025", name: "gorrita cbkr crew", weight: 0.3, volume: 0.0003 },
  { sku: "1021", name: "growblock 10x10", weight: 0.25, volume: 0.0004 },
  { sku: "1044", name: "growblock 5x5", weight: 0.1, volume: 0.000075 },
  { sku: "1022", name: "growblock 8x8", weight: 0.2, volume: 0.000192 },
  { sku: "1001", name: "gypsum - 1KG", weight: 1, volume: 0.00048 },
  { sku: "1002", name: "gypsum - 5KG", weight: 5.2, volume: 0.008379 },
  { sku: "1023", name: "humus de lombriz californiana - 22L", weight: 8.5, volume: 0.0126 },
  { sku: "1016", name: "jiffy - easy fill bag 13,6L", weight: 1.8, volume: 0.004056 },
  { sku: "1017", name: "jiffy - easy fill bag 4,7L", weight: 0.68, volume: 0.001785 },
  { sku: "1018", name: "jiffy - easy fill bag 8L", weight: 1.1, volume: 0.002527 },
  { sku: "P738288", name: "kashi mix - 25L", weight: 11.6, volume: 0.036 },
  { sku: "2", name: "kashi mix - 5L", weight: 2.3, volume: 0.008379 },
  { sku: "1007", name: "kashi mix - 800CC", weight: 0.3, volume: 0.001156 },
  { sku: "kashi25bolsa", name: "kashi bolsa 25L", weight: 11.8, volume: 0.016 },
  { sku: "kit100L", name: "Kit 100L", weight: 66, volume: 0.108 },
  { sku: "kit100Lscrog", name: "Kit 100L con Scrog", weight: 70, volume: 0.0995 },
  { sku: "kit200L", name: "Kit 200L", weight: 71, volume: 0.10425 },
  { sku: "kit200Lscrog", name: "Kit 200L con Scrog", weight: 76, volume: 0.1092 },
  { sku: "kit350L", name: "Kit 350L", weight: 119, volume: 0.26268 },
  { sku: "kit50L", name: "Kit 50L", weight: 36, volume: 0.128 },
  { sku: "kit700L", name: "Kit 700L", weight: 209, volume: 0.682 },
  { sku: "kitenmienda2m2", name: "Kit Enmienda 2m2", weight: 53, volume: 0.0855 },
  { sku: "kitenmienda5m2", name: "Kit Enmienda 5m2", weight: 135, volume: 0.204 },
  { sku: "1046", name: "maceta biodegradable 431CC", weight: 0.0143, volume: 0.00045 },
  { sku: "1045", name: "maceta biodegradable 79CC", weight: 0.0047, volume: 0.00018 },
  { sku: "1047", name: "maceta biodegradable 99CC", weight: 0.004, volume: 0.000108 },
  { sku: "melaza10", name: "melaza 10L", weight: 13.5, volume: 0.018928 },
  { sku: "melaza1", name: "melaza 1L", weight: 1.6, volume: 0.003375 },
  { sku: "melaza4", name: "melaza 4L", weight: 5.5, volume: 0.008379 },
  { sku: "1020", name: "monedas J7 clones", weight: 0.007, volume: 0.000008 },
  { sku: "P210480", name: "monedas J7 clones - MINI", weight: 0.00527, volume: 0.000003 },
  { sku: "P691622", name: "perlita 125L", weight: 10, volume: 0.042 },
  { sku: "P1049855", name: "remera cbkr. crew blanca", weight: 0.2, volume: 0.0007 },
  { sku: "P976315", name: "remera cbkr. crew negra", weight: 0.2, volume: 0.0007 },
  { sku: "P691430", name: "turba tps fine 225L", weight: 30, volume: 0.077 },
].sort((a, b) => a.name.localeCompare(b.name, 'es'))

// Destinations mapping
const destinations = [
  { id: 58, name: "AMBA" },
  { id: 2, name: "Bs. As. Interior" },
  { id: 13, name: "Chaco / Corrientes Interior" },
  { id: 9, name: "Ciudad de Corrientes / Resistencia" },
  { id: 6, name: "Ciudad Mendoza / Gran Mendoza" },
  { id: 14, name: "Entre Rios" },
  { id: 10, name: "Formosa" },
  { id: 8, name: "La Pampa" },
  { id: 7, name: "Mend. Inter. / San Juan" },
  { id: 12, name: "Misiones Interior" },
  { id: 11, name: "Posadas / Sta. Fe Norte" },
  { id: 1, name: "Prov. de Cordoba / Santa Fe" },
  { id: 4, name: "Salta / Jujuy / Catamarca / La Rioja / Tuc. Interior" },
  { id: 5, name: "Salta Interior" },
  { id: 3, name: "S.M.Tucuman / S. del Estero" },
]

// Weight tiers in kg
const weightTiers = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 325, 350, 375, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000]

// Pricing by weight (destination id -> weight tier -> price)
const pricingByWeight: Record<number, Record<number, number>> = {
  1: { 5: 16441, 10: 17343, 15: 23987, 20: 24875, 25: 25771, 30: 26740, 35: 27489, 40: 28927, 45: 30127, 50: 30232, 60: 32312, 70: 34573, 80: 34950, 90: 38826, 100: 45051, 120: 49534, 140: 56239, 160: 63453, 180: 70154, 200: 77299, 220: 84285, 240: 91368, 260: 98297, 280: 99757, 300: 105345, 325: 109293, 350: 111979, 375: 112565, 400: 113535, 450: 117159, 500: 128723, 550: 140529, 600: 152184, 650: 163959, 700: 166458, 750: 168616, 800: 178885, 850: 189699, 900: 200176, 950: 210736, 1000: 210736 },
  2: { 5: 22163, 10: 24348, 15: 28029, 20: 28573, 25: 28811, 30: 29544, 35: 29818, 40: 31377, 45: 32679, 50: 50407, 60: 53875, 70: 57646, 80: 58275, 90: 64737, 100: 73307, 120: 80603, 140: 91513, 160: 103252, 180: 114157, 200: 125783, 220: 137151, 240: 148676, 260: 159951, 280: 162326, 300: 171420, 325: 177844, 350: 182215, 375: 183168, 400: 184747, 450: 190644, 500: 183130, 550: 199927, 600: 211922, 650: 220399, 700: 223758, 750: 226660, 800: 231193, 850: 232349, 900: 233510, 950: 235846, 1000: 239077 },
  3: { 5: 19650, 10: 19650, 15: 23951, 20: 23951, 25: 28173, 30: 28173, 35: 32662, 40: 32662, 45: 37114, 50: 41428, 60: 52534, 70: 57452, 80: 62448, 90: 67365, 100: 72293, 120: 82199, 140: 82199, 160: 91971, 180: 101676, 200: 120698, 220: 130231, 240: 139456, 260: 148746, 280: 153488, 300: 167409, 325: 176792, 350: 190567, 375: 199953, 400: 213808, 450: 236315, 500: 258106, 550: 280593, 600: 302608, 650: 324156, 700: 345247, 750: 365886, 800: 386081, 850: 405838, 900: 425165, 950: 444067, 1000: 458887 },
  4: { 5: 22414, 10: 27321, 15: 32137, 20: 37257, 25: 42335, 30: 47256, 35: 59925, 40: 65536, 45: 71234, 50: 76842, 60: 82464, 70: 88024, 80: 93764, 90: 99386, 100: 104911, 120: 110250, 140: 115981, 160: 121588, 180: 127071, 200: 132434, 220: 137679, 240: 143161, 260: 148554, 280: 153858, 300: 159076, 325: 164207, 350: 169674, 375: 175083, 400: 180433, 450: 185727, 500: 190962, 550: 196337, 600: 274998, 650: 294953, 700: 314484, 750: 333597, 800: 352300, 850: 370598, 900: 388496, 950: 406003, 1000: 423123 },
  5: { 5: 30223, 10: 30223, 15: 36839, 20: 36839, 25: 43333, 30: 43333, 35: 50237, 40: 50237, 45: 57085, 50: 63720, 60: 80803, 70: 88367, 80: 96050, 90: 103613, 100: 111193, 120: 126430, 140: 126430, 160: 141460, 180: 156387, 200: 185644, 220: 200308, 240: 214496, 260: 228786, 280: 236079, 300: 257491, 325: 271923, 350: 293111, 375: 307546, 400: 328857, 450: 363475, 500: 396992, 550: 431579, 600: 465439, 650: 498584, 700: 531023, 750: 523619, 800: 593830, 850: 624218, 900: 653944, 950: 683017, 1000: 705812 },
  6: { 5: 11528, 10: 11528, 15: 11528, 20: 14882, 25: 14882, 30: 14882, 35: 14882, 40: 16224, 45: 16224, 50: 21632, 60: 32447, 70: 32447, 80: 37729, 90: 41922, 100: 57642, 120: 57642, 140: 68123, 160: 68123, 180: 68123, 200: 79651, 220: 79651, 240: 79651, 260: 83843, 280: 83843, 300: 83843, 325: 83843, 350: 83843, 375: 89503, 400: 99459, 450: 112203, 500: 112203, 550: 124339, 600: 124339, 650: 136434, 700: 136434, 750: 163033, 800: 163033, 850: 163033, 900: 198499, 950: 198499, 1000: 198499 },
  7: { 5: 14987, 10: 14987, 15: 14987, 20: 19326, 25: 19326, 30: 19326, 35: 19326, 40: 21086, 45: 21086, 50: 28129, 60: 42194, 70: 42194, 80: 49048, 90: 54498, 100: 74935, 120: 74935, 140: 88559, 160: 88559, 180: 88559, 200: 103546, 220: 103546, 240: 103546, 260: 108996, 280: 108996, 300: 108996, 325: 108996, 350: 108996, 375: 116353, 400: 129307, 450: 145845, 500: 145845, 550: 161658, 600: 161658, 650: 177209, 700: 177209, 750: 211935, 800: 211935, 850: 211935, 900: 258048, 950: 258048, 1000: 258048 },
  8: { 5: 10408, 10: 13472, 15: 15336, 20: 17000, 25: 18622, 30: 20045, 35: 21907, 40: 24098, 45: 25191, 50: 26506, 60: 28481, 70: 31874, 80: 34886, 90: 40527, 100: 44798, 120: 53014, 140: 53014, 160: 69282, 180: 69282, 200: 75691, 220: 75691, 240: 75691, 260: 75691, 280: 75691, 300: 82314, 325: 82314, 350: 82314, 375: 82314, 400: 90530, 450: 100004, 500: 109533, 550: 218630, 600: 218630, 650: 218630, 700: 218630, 750: 218630, 800: 218630, 850: 218630, 900: 218630, 950: 218630, 1000: 218630 },
  9: { 5: 14544, 10: 17410, 15: 17410, 20: 17410, 25: 19900, 30: 19900, 35: 23306, 40: 23306, 45: 26383, 50: 26383, 60: 29421, 70: 32609, 80: 35199, 90: 38277, 100: 40872, 120: 54174, 140: 54174, 160: 66957, 180: 66957, 200: 66957, 220: 79929, 240: 79929, 260: 92325, 280: 92118, 300: 103567, 325: 103567, 350: 116388, 375: 116388, 400: 124874, 450: 135540, 500: 145771, 550: 155628, 600: 164190, 650: 172819, 700: 180641, 750: 187714, 800: 195052, 850: 200570, 900: 205614, 950: 209874, 1000: 219326 },
  10: { 5: 17162, 10: 20544, 15: 20544, 20: 20544, 25: 23482, 30: 23482, 35: 27501, 40: 27501, 45: 31132, 50: 31132, 60: 34717, 70: 38479, 80: 41535, 90: 45167, 100: 48229, 120: 63925, 140: 63925, 160: 79009, 180: 79009, 200: 79009, 220: 94316, 240: 94316, 260: 108944, 280: 108700, 300: 122209, 325: 122209, 350: 137337, 375: 137337, 400: 147351, 450: 159937, 500: 172009, 550: 183641, 600: 193744, 650: 203926, 700: 213157, 750: 221503, 800: 230161, 850: 236673, 900: 242624, 950: 247651, 1000: 258805 },
  11: { 5: 17278, 10: 25916, 15: 29545, 20: 30904, 25: 32542, 30: 34364, 35: 37732, 40: 38788, 45: 41593, 50: 43735, 60: 45462, 70: 48590, 80: 51991, 90: 52563, 100: 58392, 120: 62492, 140: 68709, 160: 78013, 180: 88022, 200: 97317, 220: 107224, 240: 116917, 260: 126738, 280: 136344, 300: 138376, 325: 146125, 350: 148853, 375: 152515, 400: 153308, 450: 154627, 500: 158013, 550: 167288, 600: 177610, 650: 188782, 700: 203393, 750: 206485, 800: 209169, 850: 211449, 900: 213670, 950: 216917, 1000: 219977 },
  12: { 5: 22262, 10: 33393, 15: 38068, 20: 39819, 25: 41930, 30: 44278, 35: 48617, 40: 49978, 45: 53592, 50: 56352, 60: 58578, 70: 62608, 80: 66990, 90: 67727, 100: 75238, 120: 80520, 140: 88531, 160: 100519, 180: 113415, 200: 125392, 220: 138157, 240: 150646, 260: 163300, 280: 175678, 300: 178296, 325: 188281, 350: 216772, 375: 222105, 400: 223260, 450: 225180, 500: 230111, 550: 243619, 600: 258650, 650: 274919, 700: 296198, 750: 300700, 800: 304609, 850: 307930, 900: 311163, 950: 315893, 1000: 319856 },
  13: { 5: 29701, 10: 41234, 15: 46018, 20: 48212, 25: 50802, 30: 54160, 35: 58529, 40: 60779, 45: 64865, 50: 68019, 60: 71180, 70: 76098, 80: 80333, 90: 83085, 100: 91454, 120: 98525, 140: 109205, 160: 123795, 180: 138967, 200: 153510, 220: 168703, 240: 183688, 260: 198748, 280: 210860, 300: 216024, 325: 230686, 350: 250350, 375: 255367, 400: 256896, 450: 259899, 500: 267835, 550: 283751, 600: 301341, 650: 321351, 700: 341341, 750: 346354, 800: 350688, 850: 354477, 900: 358587, 950: 367447, 1000: 383055 },
  14: { 5: 13253, 10: 13253, 15: 13253, 20: 13253, 25: 13253, 30: 13253, 35: 14817, 40: 16121, 45: 17931, 50: 19393, 60: 20741, 70: 22790, 80: 24385, 90: 25629, 100: 29240, 120: 32462, 140: 37640, 160: 43865, 180: 50809, 200: 56175, 220: 61893, 240: 67488, 260: 73157, 280: 78703, 300: 79875, 325: 84348, 350: 91050, 375: 93290, 400: 93775, 450: 94581, 500: 96652, 550: 102326, 600: 108639, 650: 115473, 700: 124410, 750: 126302, 800: 127943, 850: 129338, 900: 130696, 950: 132683, 1000: 137692 },
  58: { 5: 11169, 10: 17076, 15: 19509, 20: 20404, 25: 21491, 30: 22692, 35: 24907, 40: 25604, 45: 27455, 50: 28870, 60: 30010, 70: 32073, 80: 34319, 90: 34694, 100: 38542, 120: 41246, 140: 45350, 160: 51489, 180: 58093, 200: 64229, 220: 70770, 240: 77167, 260: 83651, 280: 89994, 300: 91331, 325: 96448, 350: 100062, 375: 102521, 400: 103057, 450: 103946, 500: 107264, 550: 117851, 600: 128659, 650: 139331, 700: 150111, 750: 152399, 800: 154375, 850: 163776, 900: 173677, 950: 183269, 1000: 192937 },
}

// Volume pricing per cubic meter by destination
const volumePricing: Record<number, number> = {
  1: 112564, 2: 124657, 3: 190566, 4: 254257, 5: 293110, 6: 83843, 7: 108996, 8: 82313, 9: 116388, 10: 137336, 11: 148853, 12: 216771, 13: 191489, 14: 91049, 58: 80934,
}

// Price per additional kg over 1000kg
const overThousandPricing: Record<number, number> = {
  1: 210736, 2: 239077, 3: 458887, 4: 423123, 5: 705812, 6: 198499, 7: 258048, 8: 218630, 9: 219326, 10: 258805, 11: 219977, 12: 319856, 13: 383055, 14: 137692, 58: 192937,
}

interface CartItem {
  product: typeof products[0]
  quantity: number
}

interface Quote {
  id: string
  client_name: string
  destination: string
  products: { name: string; quantity: number }[]
  total_weight: number
  total_volume: number
  total_price: number
  created_at: string
}

export default function ShippingCalculator() {
  const [clientName, setClientName] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null)
  const [showQuote, setShowQuote] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(false)

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addToCart = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.sku === product.sku)
      if (existing) {
        return prev.map((item) =>
          item.product.sku === product.sku ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const updateQuantity = (sku: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.sku === sku ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (sku: string) => {
    setCart((prev) => prev.filter((item) => item.product.sku !== sku))
  }

  const totals = useMemo(() => {
    const weight = cart.reduce((sum, item) => sum + item.product.weight * item.quantity, 0)
    const volume = cart.reduce((sum, item) => sum + item.product.volume * item.quantity, 0)
    return { weight, volume }
  }, [cart])

  const calculatePrice = useMemo(() => {
    if (!selectedDestination || cart.length === 0) return null

    const { weight, volume } = totals
    const destPricing = pricingByWeight[selectedDestination]
    const volumeRate = volumePricing[selectedDestination]

    if (!destPricing || !volumeRate) return null

    // Calculate price by weight
    let priceByWeight = 0
    if (weight <= 0) {
      priceByWeight = 0
    } else if (weight > 1000) {
      const basePriceFor1000 = destPricing[1000]
      const extraKg = weight - 1000
      const extraKgRate = overThousandPricing[selectedDestination] / 1000
      priceByWeight = basePriceFor1000 + (extraKg * extraKgRate)
    } else {
      const applicableTier = weightTiers.find(tier => weight <= tier) || 1000
      priceByWeight = destPricing[applicableTier] || 0
    }

    // Calculate price by volume
    const priceByVolume = volume * volumeRate

    // Use the higher of the two
    const basePrice = Math.max(priceByWeight, priceByVolume)

    // Apply 21% IVA and add fixed 2600
    const finalPrice = (basePrice * 1.21) + 2600

    return Math.round(finalPrice)
  }, [selectedDestination, cart, totals])

  const destinationName = destinations.find((d) => d.id === selectedDestination)?.name || ""

  const handleGenerateQuote = () => {
    if (clientName.trim() && cart.length > 0 && selectedDestination && calculatePrice) {
      setShowQuote(true)
      setSaved(false)
    }
  }

  const handleSaveQuote = async () => {
    if (!calculatePrice) return
    
    setSaving(true)
    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: clientName,
          destination: destinationName,
          products: cart.map(item => ({ 
            name: item.product.name, 
            quantity: item.quantity,
          })),
          total_weight: totals.weight,
          total_volume: totals.volume,
          total_price: calculatePrice,
        }),
      })
      
      if (response.ok) {
        setSaved(true)
      }
    } catch (error) {
      console.error("Error saving quote:", error)
    } finally {
      setSaving(false)
    }
  }

  const loadHistory = async () => {
    setLoadingHistory(true)
    try {
      const response = await fetch("/api/quotes")
      if (response.ok) {
        const data = await response.json()
        setSavedQuotes(data)
      }
    } catch (error) {
      console.error("Error loading quotes:", error)
    } finally {
      setLoadingHistory(false)
    }
  }

  const handleShowHistory = () => {
    setShowHistory(true)
    loadHistory()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/cbkr-logo.png" alt="CBKR Logo" width={40} height={40} className="object-contain" />
            <span className="text-xl font-semibold text-neutral-800">Calculadora de Envios</span>
          </div>
          <Button variant="outline" onClick={handleShowHistory} className="gap-2">
            <History className="h-4 w-4" />
            Historial
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Product Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Name */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Datos del Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Nombre del cliente"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="text-base"
                />
              </CardContent>
            </Card>

            {/* Product Search */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Productos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <ScrollArea className="h-72 rounded-md border">
                  <div className="p-2 space-y-1">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.sku}
                        className="flex items-center justify-between p-2 hover:bg-neutral-100 rounded-md cursor-pointer transition-colors"
                        onClick={() => addToCart(product)}
                      >
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-neutral-500">
                            {product.weight}kg · {product.volume.toFixed(4)}m³
                          </p>
                        </div>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Destination */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Destino
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={(v) => setSelectedDestination(Number(v))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar provincia de destino" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((dest) => (
                      <SelectItem key={dest.id} value={dest.id.toString()}>
                        {dest.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Cart & Summary */}
          <div className="space-y-6">
            {/* Cart */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Carrito</CardTitle>
                <CardDescription>{cart.length} productos seleccionados</CardDescription>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-sm text-neutral-500 text-center py-8">
                    Agregue productos para calcular el envio
                  </p>
                ) : (
                  <ScrollArea className="h-64">
                    <div className="space-y-2">
                      {cart.map((item) => (
                        <div key={item.product.sku} className="flex items-center justify-between p-2 bg-neutral-50 rounded-md">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.product.name}</p>
                            <p className="text-xs text-neutral-500">
                              {(item.product.weight * item.quantity).toFixed(1)}kg
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(item.product.sku, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(item.product.sku, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-red-500 hover:text-red-600"
                              onClick={() => removeFromCart(item.product.sku)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Peso total</span>
                  <span className="font-medium">{totals.weight.toFixed(1)} kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Volumen total</span>
                  <span className="font-medium">{totals.volume.toFixed(4)} m³</span>
                </div>
                <Separator />
                {calculatePrice && (
                  <div className="flex justify-between items-baseline">
                    <span className="text-neutral-600">Costo de envio</span>
                    <span className="text-2xl font-bold text-neutral-900">
                      ${calculatePrice.toLocaleString("es-AR")}
                    </span>
                  </div>
                )}
                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={!clientName.trim() || cart.length === 0 || !selectedDestination}
                  onClick={handleGenerateQuote}
                >
                  Generar Cotizacion
                </Button>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card className="bg-neutral-900 text-white">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Condiciones de Envio</h3>
                <ul className="text-sm space-y-2 text-neutral-300">
                  <li>Envio por Expreso Lancioni</li>
                  <li>Entrega puerta a puerta</li>
                  <li>Codigo de seguimiento por email al despachar</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Quote Modal - Apple Style Landscape */}
      {showQuote && calculatePrice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl">
            <div className="p-10">
              {/* Header Row */}
              <div className="flex items-start justify-between mb-10">
                <Image src="/images/cbkr-logo.png" alt="CBKR" width={56} height={56} className="object-contain" />
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full hover:bg-neutral-100" onClick={() => setShowQuote(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Main Content - Landscape Layout */}
              <div className="grid grid-cols-2 gap-12">
                {/* Left Side - Details */}
                <div className="space-y-8">
                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2">Cotizacion para</p>
                    <p className="text-3xl font-semibold text-neutral-900">{clientName}</p>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2">Destino</p>
                    <p className="text-lg text-neutral-700">{destinationName}</p>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-widest mb-3">Productos</p>
                    <div className="flex flex-wrap gap-2">
                      {cart.map((item) => (
                        <Badge key={item.product.sku} variant="secondary" className="text-sm py-1 px-3 bg-neutral-100 text-neutral-700 font-normal">
                          {item.quantity}x {item.product.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Peso</p>
                      <p className="text-lg text-neutral-700">{totals.weight.toFixed(1)} kg</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Volumen</p>
                      <p className="text-lg text-neutral-700">{totals.volume.toFixed(3)} m³</p>
                    </div>
                  </div>
                </div>

                {/* Right Side - Price */}
                <div className="flex flex-col justify-center items-center bg-neutral-50 rounded-2xl p-8">
                  <p className="text-xs text-neutral-400 uppercase tracking-widest mb-3">Costo de Envio</p>
                  <p className="text-6xl font-bold text-neutral-900 mb-6">${calculatePrice.toLocaleString("es-AR")}</p>
                  
                  {saved ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Cotizacion guardada</span>
                    </div>
                  ) : (
                    <Button onClick={handleSaveQuote} disabled={saving} size="lg" className="gap-2">
                      <Save className="h-4 w-4" />
                      {saving ? "Guardando..." : "Guardar Cotizacion"}
                    </Button>
                  )}
                </div>
              </div>

              {/* Footer */}
              <Separator className="my-8" />
              <div className="flex items-center justify-between text-sm text-neutral-400">
                <p>Envio por Expreso Lancioni · Entrega puerta a puerta</p>
                <p>Codigo de seguimiento por email al despachar</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col">
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Historial de Cotizaciones</h2>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowHistory(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1 p-6">
              {loadingHistory ? (
                <p className="text-center text-neutral-500 py-8">Cargando...</p>
              ) : savedQuotes.length === 0 ? (
                <p className="text-center text-neutral-500 py-8">No hay cotizaciones guardadas</p>
              ) : (
                <div className="space-y-4">
                  {savedQuotes.map((quote) => (
                    <Card key={quote.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <h3 className="font-semibold text-lg">{quote.client_name}</h3>
                              <Badge variant="outline" className="text-xs">{quote.destination}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {quote.products.map((p, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs font-normal">
                                  {p.quantity}x {p.name}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-6 text-sm text-neutral-500">
                              <span>{Number(quote.total_weight).toFixed(1)} kg</span>
                              <span>{Number(quote.total_volume).toFixed(4)} m³</span>
                              <span>{formatDate(quote.created_at)}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-neutral-900">
                              ${Number(quote.total_price).toLocaleString("es-AR")}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  )
}
