import supabase from "../supabase";
import { supabaseUrl } from "../supabase";

//get all homes
export async function getHome() {
  let { data, error } = await supabase.from("PersonalHouses").select("*");

  if (error) throw newError("could not get houses");
  return data;
}

//get home by id
export async function getHomeById(id) {
  let { data, error } = await supabase
    .from("PersonalHouses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error("can't load. reload again");
  }

  return data;
}

export async function createHome(newHome) {
  const images = Array.from(newHome.image);

  const imageName = images.map((img) =>
    `${Math.random()}-${img.name}`.replaceAll("/", "")
  );

  const imagePath = imageName.map(
    (imgName) => `${supabaseUrl}/storage/v1/object/public/houses/${imgName}`
  );

  const { data, error: homeError } = await supabase
    .from("PersonalHouses")
    .insert([{ ...newHome, image: imagePath }]) // Initialize with empty image array
    .select();

  if (homeError) {
    throw new Error("house can't be Listed");
  }

  for (let i = 0; i < images.length; i++) {
    const { error: storageError } = await supabase.storage
      .from("houses")
      .upload(imageName[i], images[i]);

    if (storageError) {
      await supabase.from("houses").delete().eq("id", data.id);
      throw new Error(
        "house photos could not be uploaded and the house is not listed"
      );
    }
  }

  return data;
}

export async function editHouse(totalUpdatingInfo) {
  const { id, updatingData } = totalUpdatingInfo;
  console.log(id);
  console.log(updatingData);
  const { data, error } = await supabase
    .from("PersonalHouses")
    .update(updatingData)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
  console.log(data);
}

export async function deleteHome(id) {
  const { error } = await supabase.from("houses").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("house could not be deleted");
  }
}

export async function countHouses() {
  const { data, error, count } = await supabase
    .from("PersonalHouses")
    .select("*", { count: "exact" });

  if (error) {
    console.error("Error counting houses:", error);
    return { count: 0, error };
  }

  return { count: count || 0, error: null };
}

export async function getLister(id) {
  let { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("can't get the Lister");
  }

  return data;
}
