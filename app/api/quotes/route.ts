import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { client_name, destination, products, total_weight, total_volume, total_price } = body

    const { data, error } = await supabase
      .from("quotes")
      .insert({
        client_name,
        destination,
        products,
        total_weight,
        total_volume,
        total_price,
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating quote:", error)
    return NextResponse.json({ error: "Failed to create quote" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching quotes:", error)
    return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 })
  }
}
