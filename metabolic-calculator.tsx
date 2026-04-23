"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calculator, Languages } from "lucide-react"

const foodDatabase = {
  大米: { kcal: 129, carbs: 27.9, protein: 2.66, fat: 0.28 },
  燕麦: { kcal: 384, carbs: 67, protein: 16, fat: 6.3 },
  土豆: { kcal: 104, carbs: 19.36, protein: 1.66, fat: 2.4 },
  香蕉: { kcal: 89, carbs: 22.8, protein: 1.1, fat: 0.3 },
  面包: { kcal: 265, carbs: 49, protein: 9, fat: 3.2 },
  鸡胸肉: { kcal: 133, carbs: 0, protein: 31, fat: 1.2 },
  鸡腿肉: { kcal: 172, carbs: 0, protein: 25, fat: 7.5 },
  鸡蛋: { kcal: 144, carbs: 1.1, protein: 13, fat: 8.8 },
  牛奶: { kcal: 54, carbs: 3.4, protein: 3.0, fat: 3.2 },
  无糖酸奶: { kcal: 59, carbs: 4.7, protein: 10, fat: 0.4 },
  牛油果: { kcal: 160, carbs: 8.5, protein: 2, fat: 14.7 },
  坚果: { kcal: 607, carbs: 16, protein: 20, fat: 54 }, // 混合坚果的平均值
  橄榄油: { kcal: 884, carbs: 0, protein: 0, fat: 100 },
  菠菜: { kcal: 23, carbs: 3.6, protein: 2.9, fat: 0.4 },
  西红柿: { kcal: 19, carbs: 3.9, protein: 0.9, fat: 0.2 },
  酱油: { kcal: 63, carbs: 10.1, protein: 10.5, fat: 0.1 },
}

const foodDatabaseEn = {
  Rice: { kcal: 116, carbs: 25.9, protein: 2.6, fat: 0.3 },
  Oats: { kcal: 389, carbs: 66.3, protein: 16.9, fat: 6.9 },
  Potato: { kcal: 76, carbs: 17.2, protein: 2.0, fat: 0.1 },
  Banana: { kcal: 89, carbs: 22.8, protein: 1.1, fat: 0.3 },
  Bread: { kcal: 265, carbs: 49, protein: 9, fat: 3.2 },
  "Chicken Breast": { kcal: 133, carbs: 0, protein: 31, fat: 1.2 },
  "Chicken Thigh": { kcal: 172, carbs: 0, protein: 25, fat: 7.5 },
  Egg: { kcal: 144, carbs: 1.1, protein: 13, fat: 8.8 },
  Milk: { kcal: 54, carbs: 3.4, protein: 3.0, fat: 3.2 },
  "Sugar-free Yogurt": { kcal: 59, carbs: 4.7, protein: 10, fat: 0.4 },
  Avocado: { kcal: 160, carbs: 8.5, protein: 2, fat: 14.7 },
  Nuts: { kcal: 607, carbs: 16, protein: 20, fat: 54 },
  "Olive Oil": { kcal: 884, carbs: 0, protein: 0, fat: 100 },
  Spinach: { kcal: 23, carbs: 3.6, protein: 2.9, fat: 0.4 },
  Tomato: { kcal: 19, carbs: 3.9, protein: 0.9, fat: 0.2 },
  "Soy Sauce": { kcal: 63, carbs: 10.1, protein: 10.5, fat: 0.1 },
}

const activityLevels = {
  sedentary: {
    name: "久坐不动",
    description: "几乎不运动，日常坐办公室，上下班通勤为主",
    factor: 1.2,
  },
  lightly_active: {
    name: "轻度活动",
    description: "每周1-3次轻度运动，例如散步、家务等",
    factor: 1.375,
  },
  moderately_active: {
    name: "中度活动",
    description: "每周3-5次中等强度运动，例如快走、骑车、健身房锻炼",
    factor: 1.55,
  },
  very_active: {
    name: "高度活动",
    description: "每周6-7次高强度运动，或重体力劳动",
    factor: 1.725,
  },
  super_active: {
    name: "超高活动",
    description: "每天两练、竞技运动员等",
    factor: 1.9,
  },
}

const activityLevelsEn = {
  sedentary: {
    name: "Sedentary",
    description: "Little or no exercise, desk job, mainly commuting",
    factor: 1.2,
  },
  lightly_active: {
    name: "Lightly Active",
    description: "Light exercise 1-3 times per week, walking, housework",
    factor: 1.375,
  },
  moderately_active: {
    name: "Moderately Active",
    description: "Moderate exercise 3-5 times per week, brisk walking, cycling, gym",
    factor: 1.55,
  },
  very_active: {
    name: "Very Active",
    description: "Heavy exercise 6-7 times per week, or physical labor",
    factor: 1.725,
  },
  super_active: {
    name: "Super Active",
    description: "Very heavy physical work or 2x training, competitive sports",
    factor: 1.9,
  },
}

const translations = {
  zh: {
    title: "代谢+",
    subtitle: "食以智慧，身康体健", // 修改中文标语
    metabolicCalculator: "代谢计算器",
    metabolicDescription: "输入您的基本信息，计算基础代谢率(BMR)和每日总消耗热量(TDEE)",
    recipeCalculator: "食谱热量计算器",
    recipeDescription: "输入食材名称和重量，计算营养成分（请使用食材生重计算）",
    age: "年龄 (岁)",
    height: "身高 (cm)",
    weight: "体重 (kg)",
    gender: "性别",
    male: "男性",
    female: "女性",
    activityLevel: "活动水平",
    selectActivity: "选择您的活动水平",
    calculate: "计算代谢",
    reset: "重置",
    bmr: "BMR (千卡/天)",
    tdee: "TDEE (千卡/天)",
    weightLossAdvice: "减重建议",
    lightWeightLoss: "轻度减重:",
    moderateWeightLoss: "中度减重:",
    rapidWeightLoss: "快速减重:",
    dailyIntakeAdvice: "* 建议每日摄入不低于",
    ingredient: "食材",
    weightGrams: "重量(g)",
    delete: "删除",
    addIngredient: "添加食材",
    customIngredient: "+ 自定义食材",
    nutritionSummary: "营养汇总",
    totalCalories: "总热量",
    carbohydrates: "碳水化合物",
    protein: "蛋白质",
    fat: "脂肪",
    formulaExplanation: "计算公式说明",
    mifflinFormula: "Mifflin-St Jeor 公式",
    maleFormula: "男性:",
    femaleFormula: "女性:",
    formulaVariables: "W=体重(kg), H=身高(cm), A=年龄(岁)",
    tdeeCalculation: "TDEE 计算",
    tdeeFormula: "TDEE = BMR × 活动系数",
    activityFactorDesc: "活动系数根据您的日常活动水平确定，范围从1.2（久坐）到1.9（超高活动）",
    addCustomFood: "添加自定义食材 (每100g营养成分)",
    foodName: "食材名称",
    calories: "热量(kcal)",
    carbs: "碳水(g)",
    proteinShort: "蛋白质(g)",
    fatShort: "脂肪(g)",
    confirm: "确认添加",
    cancel: "取消",
    fillAllFields: "请填写所有必填项",
    fillCompleteInfo: "请填写完整的食材信息",
    sedentary: "久坐不动",
    lightlyActive: "轻度活动",
    moderatelyActive: "中度活动",
    veryActive: "高度活动",
    superActive: "超高活动",
    selectIngredient: "选择食材",
    custom: "(自定义)",
    kcalPerDay: "千卡/天",
  },
  en: {
    title: "Calc+",
    subtitle: "Eat wise, stay fit", // 修改英文标语
    metabolicCalculator: "Metabolic Calculator",
    metabolicDescription: "Enter your basic information to calculate BMR and TDEE",
    recipeCalculator: "Recipe Calorie Calculator",
    recipeDescription: "Enter ingredient names and weights to calculate nutrition (use raw weight)",
    age: "Age (years)",
    height: "Height (cm)",
    weight: "Weight (kg)",
    gender: "Gender",
    male: "Male",
    female: "Female",
    activityLevel: "Activity Level",
    selectActivity: "Select your activity level",
    calculate: "Calculate Metabolism",
    reset: "Reset",
    bmr: "BMR (kcal/day)",
    tdee: "TDEE (kcal/day)",
    weightLossAdvice: "Weight Loss Advice",
    lightWeightLoss: "Light weight loss:",
    moderateWeightLoss: "Moderate weight loss:",
    rapidWeightLoss: "Rapid weight loss:",
    dailyIntakeAdvice: "* Recommended daily intake not less than",
    ingredient: "Ingredient",
    weightGrams: "Weight(g)",
    delete: "Delete",
    addIngredient: "Add Ingredient",
    customIngredient: "+ Custom Ingredient",
    nutritionSummary: "Nutrition Summary",
    totalCalories: "Total Calories",
    carbohydrates: "Carbohydrates",
    protein: "Protein",
    fat: "Fat",
    formulaExplanation: "Formula Explanation",
    mifflinFormula: "Mifflin-St Jeor Formula",
    maleFormula: "Male:",
    femaleFormula: "Female:",
    formulaVariables: "W=Weight(kg), H=Height(cm), A=Age(years)",
    tdeeCalculation: "TDEE Calculation",
    tdeeFormula: "TDEE = BMR × Activity Factor",
    activityFactorDesc: "Activity factor ranges from 1.2 (sedentary) to 1.9 (super active)",
    addCustomFood: "Add Custom Food (per 100g nutrition)",
    foodName: "Food Name",
    calories: "Calories(kcal)",
    carbs: "Carbs(g)",
    proteinShort: "Protein(g)",
    fatShort: "Fat(g)",
    confirm: "Confirm",
    cancel: "Cancel",
    fillAllFields: "Please fill in all required fields",
    fillCompleteInfo: "Please fill in complete food information",
    sedentary: "Sedentary",
    lightlyActive: "Lightly Active",
    moderatelyActive: "Moderately Active",
    veryActive: "Very Active",
    superActive: "Super Active",
    selectIngredient: "Select Ingredient",
    custom: "(Custom)",
    kcalPerDay: "kcal/day",
  },
}

export default function Component() {
  // 检测用户浏览器语言偏好
  const getInitialLanguage = (): "zh" | "en" => {
    if (typeof window === "undefined") return "zh"

    const browserLang = navigator.language || navigator.languages?.[0] || "zh"

    // 检查是否为中文相关语言
    if (browserLang.startsWith("zh")) {
      return "zh"
    }

    // 其他语言默认显示英文
    return "en"
  }

  const [language, setLanguage] = useState<"zh" | "en">(getInitialLanguage)
  const [customFoods, setCustomFoods] = useState<
    Record<string, { kcal: number; carbs: number; protein: number; fat: number }>
  >({})
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
    activityLevel: "",
  })

  const [results, setResults] = useState<{
    bmr: number
    tdee: number
  } | null>(null)

  const [recipeItems, setRecipeItems] = useState<
    Array<{
      id: number
      foodName: string
      weight: string
    }>
  >([{ id: 1, foodName: "", weight: "" }])

  const [showCustomForm, setShowCustomForm] = useState<number | null>(null)
  const [customFoodForm, setCustomFoodForm] = useState({
    name: "",
    kcal: "",
    carbs: "",
    protein: "",
    fat: "",
  })

  const [totalNutrition, setTotalNutrition] = useState<{
    kcal: number
    carbs: number
    protein: number
    fat: number
  } | null>(null)

  const t = translations[language]
  const currentFoodDatabase = language === "zh" ? foodDatabase : foodDatabaseEn
  const currentActivityLevels = language === "zh" ? activityLevels : activityLevelsEn

  useEffect(() => {
    calculateTotalNutrition()
  }, [recipeItems, customFoods])

  // Update document language when language changes
  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en"

    // Update page title based on language
    const title =
      language === "zh" ? "代谢+ | 免费代谢计算器和食谱热量计算器" : "Calc+ | Free Metabolic & Recipe Calculator"
    document.title = title

    // Update meta description
    const description =
      language === "zh"
        ? "免费的代谢计算器和食谱热量计算器。计算基础代谢率(BMR)、每日总消耗热量(TDEE)和营养成分。支持自定义食材，科学减重建议。"
        : "Free metabolic calculator and recipe calorie calculator. Calculate BMR, TDEE, and nutrition facts. Custom ingredients supported with scientific weight loss advice."

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", description)
    }
  }, [language])

  // 保存用户语言偏好到 localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", language)
    }
  }, [language])

  // 在组件初始化时读取保存的语言偏好
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("preferred-language") as "zh" | "en"
      if (savedLanguage && savedLanguage !== language) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "zh" ? "en" : "zh"))

    // Track language change in Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "language_change", {
        event_category: "engagement",
        event_label: language === "zh" ? "en" : "zh",
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRecipeItemChange = (id: number, field: string, value: string) => {
    setRecipeItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))

    // 如果选择了食材但没有重量，自动设置为100g
    if (field === "foodName" && value && value !== "custom") {
      const currentItem = recipeItems.find((item) => item.id === id)
      if (currentItem && !currentItem.weight) {
        setRecipeItems((prev) => prev.map((item) => (item.id === id ? { ...item, weight: "100" } : item)))
      }
    }
  }

  const addRecipeItem = () => {
    const newId = Math.max(...recipeItems.map((item) => item.id)) + 1
    setRecipeItems((prev) => [...prev, { id: newId, foodName: "", weight: "" }])
  }

  const removeRecipeItem = (id: number) => {
    if (recipeItems.length > 1) {
      setRecipeItems((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const calculateMetabolism = () => {
    const { age, height, weight, gender, activityLevel } = formData

    if (!age || !height || !weight || !gender || !activityLevel) {
      alert(t.fillAllFields)
      return
    }

    const ageNum = Number.parseFloat(age)
    const heightNum = Number.parseFloat(height)
    const weightNum = Number.parseFloat(weight)

    // 使用 Mifflin-St Jeor 公式计算 BMR
    let bmr: number
    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161
    }

    // 计算 TDEE
    const activityFactor = currentActivityLevels[activityLevel as keyof typeof currentActivityLevels].factor
    const tdee = bmr * activityFactor

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
    })

    // Track calculation in Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "calculate_metabolism", {
        event_category: "calculator",
        event_label: `${gender}_${activityLevel}`,
        value: Math.round(tdee),
      })
    }
  }

  const handleCustomFoodSubmit = (itemId: number) => {
    const { name, kcal, carbs, protein, fat } = customFoodForm
    if (!name || !kcal || !carbs || !protein || !fat) {
      alert(t.fillCompleteInfo)
      return
    }

    const newFood = {
      kcal: Number.parseFloat(kcal),
      carbs: Number.parseFloat(carbs),
      protein: Number.parseFloat(protein),
      fat: Number.parseFloat(fat),
    }

    setCustomFoods((prev) => ({ ...prev, [name]: newFood }))
    handleRecipeItemChange(itemId, "foodName", name)
    setShowCustomForm(null)
    setCustomFoodForm({ name: "", kcal: "", carbs: "", protein: "", fat: "" })

    // Track custom food addition in Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "add_custom_food", {
        event_category: "recipe_calculator",
        event_label: name,
      })
    }
  }

  const calculateTotalNutrition = () => {
    let totalKcal = 0
    let totalCarbs = 0
    let totalProtein = 0
    let totalFat = 0

    for (const item of recipeItems) {
      if (!item.foodName) continue

      const allFoods = { ...currentFoodDatabase, ...customFoods }
      const food = allFoods[item.foodName as keyof typeof allFoods]
      if (!food) continue

      // 如果有重量就用重量，没有重量就用默认100g
      const weight = item.weight ? Number.parseFloat(item.weight) : 100
      if (isNaN(weight) || weight <= 0) continue

      const multiplier = weight / 100

      totalKcal += food.kcal * multiplier
      totalCarbs += food.carbs * multiplier
      totalProtein += food.protein * multiplier
      totalFat += food.fat * multiplier
    }

    setTotalNutrition({
      kcal: Math.round(totalKcal),
      carbs: Math.round(totalCarbs * 10) / 10,
      protein: Math.round(totalProtein * 10) / 10,
      fat: Math.round(totalFat * 10) / 10,
    })
  }

  const resetForm = () => {
    setFormData({
      age: "",
      height: "",
      weight: "",
      gender: "",
      activityLevel: "",
    })
    setResults(null)
  }

  const resetRecipe = () => {
    setRecipeItems([{ id: 1, foodName: "", weight: "" }])
    setTotalNutrition(null)
    setShowCustomForm(null)
    setCustomFoodForm({ name: "", kcal: "", carbs: "", protein: "", fat: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* 标题和语言切换 */}
        <div className="text-center space-y-2 relative">
          <Button
            onClick={toggleLanguage}
            variant="outline"
            size="sm"
            className="absolute right-0 top-0 bg-transparent"
            aria-label={language === "zh" ? "Switch to English" : "切换到中文"}
          >
            <Languages className="h-4 w-4 mr-2" />
            {language === "zh" ? "EN" : "中文"}
          </Button>
          <h1 className="text-4xl font-bold text-gray-900">{t.title}</h1>
          <p className="text-lg text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* 输入表单 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                {t.metabolicCalculator}
              </CardTitle>
              <CardDescription>{t.metabolicDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 基本信息 */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="age">{t.age}</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder={language === "zh" ? "例如：28" : "e.g.: 28"}
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">{t.height}</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder={language === "zh" ? "例如：175" : "e.g.: 175"}
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">{t.weight}</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder={language === "zh" ? "例如：70" : "e.g.: 70"}
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                />
              </div>

              {/* 性别选择 */}
              <div className="space-y-3">
                <Label>{t.gender}</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">{t.male}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">{t.female}</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* 活动水平选择 */}
              <div className="space-y-2">
                <Label htmlFor="activity">{t.activityLevel}</Label>
                <Select
                  value={formData.activityLevel}
                  onValueChange={(value) => handleInputChange("activityLevel", value)}
                >
                  <SelectTrigger className="text-center overflow-visible whitespace-nowrap text-clip">
                    <SelectValue placeholder={t.selectActivity} className="text-center">
                      {formData.activityLevel
                        ? currentActivityLevels[formData.activityLevel as keyof typeof currentActivityLevels].name
                        : t.selectActivity}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(currentActivityLevels).map(([key, level]) => (
                      <SelectItem key={key} value={key}>
                        <div className="space-y-1">
                          <div className="font-medium">{level.name}</div>
                          <div className="text-sm text-gray-500">{level.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 按钮 */}
              <div className="flex gap-3">
                <Button onClick={calculateMetabolism} className="flex-1">
                  <Calculator className="mr-2 h-4 w-4" />
                  {t.calculate}
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  {t.reset}
                </Button>
              </div>
              {/* 计算结果 - 简单显示 */}
              {results && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-900">{results.bmr}</div>
                      <div className="text-sm text-blue-700">{t.bmr}</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-900">{results.tdee}</div>
                      <div className="text-sm text-green-700">{t.tdee}</div>
                    </div>
                  </div>

                  {/* 减重建议 */}
                  <div className="rounded-lg border bg-orange-50 p-3">
                    <h4 className="font-medium text-orange-900 mb-2">{t.weightLossAdvice}</h4>
                    <div className="space-y-1 text-sm text-orange-800">
                      <div className="flex justify-between">
                        <span>{t.lightWeightLoss}</span>
                        <span className="font-medium">
                          {results.tdee - 250} {t.kcalPerDay}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t.moderateWeightLoss}</span>
                        <span className="font-medium">
                          {results.tdee - 500} {t.kcalPerDay}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t.rapidWeightLoss}</span>
                        <span className="font-medium">
                          {results.tdee - 750} {t.kcalPerDay}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-orange-600 mt-2">
                      {t.dailyIntakeAdvice} {Math.round(results.bmr * 0.8)} {language === "zh" ? "千卡" : "kcal"}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 右侧食谱热量计算器 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                {t.recipeCalculator}
              </CardTitle>
              <CardDescription>{t.recipeDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recipeItems.map((item, index) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Label>
                        {t.ingredient} {index + 1}
                      </Label>
                      <Select
                        value={item.foodName}
                        onValueChange={(value) => {
                          if (value === "custom") {
                            setShowCustomForm(item.id)
                          } else {
                            handleRecipeItemChange(item.id, "foodName", value)
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t.selectIngredient} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="custom">{t.customIngredient}</SelectItem>
                          {Object.keys(currentFoodDatabase).map((food) => (
                            <SelectItem key={food} value={food}>
                              {food}
                            </SelectItem>
                          ))}
                          {Object.keys(customFoods).map((food) => (
                            <SelectItem key={food} value={food}>
                              {food} {t.custom}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-24">
                      <Label>{t.weightGrams}</Label>
                      <Input
                        type="number"
                        placeholder="100"
                        value={item.weight}
                        onChange={(e) => handleRecipeItemChange(item.id, "weight", e.target.value)}
                      />
                    </div>
                    {recipeItems.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeRecipeItem(item.id)} className="mb-0">
                        {t.delete}
                      </Button>
                    )}
                  </div>

                  {showCustomForm === item.id && (
                    <div className="border rounded-lg p-3 bg-gray-50 space-y-3">
                      <div className="text-sm font-medium">{t.addCustomFood}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder={t.foodName}
                          value={customFoodForm.name}
                          onChange={(e) => setCustomFoodForm((prev) => ({ ...prev, name: e.target.value }))}
                        />
                        <Input
                          type="number"
                          placeholder={t.calories}
                          value={customFoodForm.kcal}
                          onChange={(e) => setCustomFoodForm((prev) => ({ ...prev, kcal: e.target.value }))}
                        />
                        <Input
                          type="number"
                          placeholder={t.carbs}
                          value={customFoodForm.carbs}
                          onChange={(e) => setCustomFoodForm((prev) => ({ ...prev, carbs: e.target.value }))}
                        />
                        <Input
                          type="number"
                          placeholder={t.proteinShort}
                          value={customFoodForm.protein}
                          onChange={(e) => setCustomFoodForm((prev) => ({ ...prev, protein: e.target.value }))}
                        />
                      </div>
                      <Input
                        type="number"
                        placeholder={t.fatShort}
                        value={customFoodForm.fat}
                        onChange={(e) => setCustomFoodForm((prev) => ({ ...prev, fat: e.target.value }))}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleCustomFoodSubmit(item.id)}>
                          {t.confirm}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setShowCustomForm(null)
                            setCustomFoodForm({ name: "", kcal: "", carbs: "", protein: "", fat: "" })
                          }}
                        >
                          {t.cancel}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex gap-3">
                <Button onClick={addRecipeItem} variant="outline" className="flex-1 bg-transparent">
                  {t.addIngredient}
                </Button>
                <Button variant="outline" onClick={resetRecipe}>
                  {t.reset}
                </Button>
              </div>

              {totalNutrition &&
                (totalNutrition.kcal > 0 ||
                  totalNutrition.carbs > 0 ||
                  totalNutrition.protein > 0 ||
                  totalNutrition.fat > 0) && (
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-medium text-center">{t.nutritionSummary}</h4>
                    <div className="grid gap-2">
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="text-red-800 font-medium">{t.totalCalories}</span>
                        <span className="text-red-900 font-bold">{totalNutrition.kcal} kcal</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-blue-800 font-medium">{t.carbohydrates}</span>
                        <span className="text-blue-900 font-bold">{totalNutrition.carbs} g</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-green-800 font-medium">{t.protein}</span>
                        <span className="text-green-900 font-bold">{totalNutrition.protein} g</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <span className="text-yellow-800 font-medium">{t.fat}</span>
                        <span className="text-yellow-900 font-bold">{totalNutrition.fat} g</span>
                      </div>
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>
        </div>

        {/* 公式说明 */}
        <Card>
          <CardHeader>
            <CardTitle>{t.formulaExplanation}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">{t.mifflinFormula}</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>{t.maleFormula}</strong> BMR = 10W + 6.25H - 5A + 5
                  </div>
                  <div>
                    <strong>{t.femaleFormula}</strong> BMR = 10W + 6.25H - 5A - 161
                  </div>
                  <div className="text-gray-600">{t.formulaVariables}</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t.tdeeCalculation}</h4>
                <div className="text-sm">
                  <div>{t.tdeeFormula}</div>
                  <div className="text-gray-600 mt-2">{t.activityFactorDesc}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-8">
        <a href="https://www.buymeacoffee.com/dav1s" target="_blank" rel="noopener noreferrer" className="inline-block">
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            style={{ height: "60px", width: "217px" }}
          />
        </a>
      </div>
    </div>
  )
}
