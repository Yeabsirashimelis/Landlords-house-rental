import supabase from "../supabase";

export async function getMyHomes(myId) {
  let { data, error } = await supabase
    .from("PersonalHouses")
    .select("*")
    .eq("userId", myId);

  if (error) {
    console.log(error.message);
    throw new Error("can't load. reload again");
  }

  return data;
}

export async function removeMyHouse(id) {
  console.log(id);

  // const { data: messageData, error: messageError } = await supabase
  //   .from("messages")
  //   .select()
  //   .eq("houseId", id);

  // if (messageError) {
  //   console.log(error.message);
  //   throw new Error("messages come");
  // }

  // console.log(messageData);

  const { data: houseData, error } = await supabase
    .from("PersonalHouses")
    .delete("*")
    .eq("id", id)
    .single();
  if (error) {
    console.log(error.message);
    throw new Error("House can not be removed from Listings. try again!");
  }

  console.log(houseData);
  return houseData;
}
