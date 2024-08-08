import supabase from "../supabase";

export async function fetchBookmarks(myId) {
  try {
    //fetch user bookmarks
    let { data, error } = await supabase
      .from("users")
      .select("bookmarks")
      .eq("id", myId)
      .single();
    if (error) throw error;
    let bookmarks = data.bookmarks ? [...data.bookmarks] : [];

    if (bookmarks.length === 0) return [];

    // Fetch house details for bookmarked houseIds
    let { data: houses, error: housesError } = await supabase
      .from("PersonalHouses")
      .select("*")
      .in("id", bookmarks);
    if (housesError) throw housesError;

    return houses;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export async function toggleBookmark(myId, houseId) {
  try {
    // Fetch current bookmarks
    let { data, error } = await supabase
      .from("users")
      .select("bookmarks")
      .eq("id", myId)
      .single();
    if (error) throw error;

    // Handle null bookmarks
    let bookmarks = data.bookmarks ? [...data.bookmarks] : [];

    let message;

    // Check if houseId is in bookmarks
    if (bookmarks.includes(houseId)) {
      // Remove houseId from bookmarks
      bookmarks = bookmarks.filter((id) => id !== houseId);
      message = "removed from bookmarks";
    } else {
      // Add houseId to bookmarks
      bookmarks.push(houseId);
      message = "added to bookmarks";
    }

    // Update bookmarks in the database
    const { data: updatedData, error: updateError } = await supabase
      .from("users")
      .update({ bookmarks })
      .eq("id", myId)
      .select();
    if (updateError) throw updateError;

    return message;
  } catch (error) {
    console.error(error.message);
  }
}

export async function fetchBookmarkStatus(myId, houseId) {
  try {
    let { data, error } = await supabase
      .from("users")
      .select("bookmarks")
      .eq("id", myId)
      .single();
    if (error) throw error;
    let bookmarks = data.bookmarks ? [...data.bookmarks] : [];

    if (bookmarks.includes(houseId)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error.message);
  }
}
