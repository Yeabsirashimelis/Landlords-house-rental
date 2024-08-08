import supabase from "../supabase";

// Send a new message
export async function sendMessage(message) {
  const { data, error } = await supabase
    .from("messages")
    .insert([message])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

// Fetch all messages that involve the current user
export async function getEveryOneITalk(myId) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(`userId.eq.${myId},senderId.eq.${myId}`);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
  return data;
}

// Fetch messages between two users for a specific house
export async function getMessage(houseId, senderId, receiverId) {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .or(
      `and(houseId.eq.${houseId},senderId.eq.${senderId},userId.eq.${receiverId}),and(houseId.eq.${houseId},senderId.eq.${receiverId},userId.eq.${senderId})`
    );

  if (error) throw new Error(error.message);

  return messages;
}
