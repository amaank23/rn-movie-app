import { Client, ID, Query, TablesDB } from "react-native-appwrite";
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.equal("searchTerm", query)],
    });
    if (result.rows.length > 0) {
      const existingMovies = result.rows[0];

      await database.updateRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: existingMovies.$id,
        data: {
          count: existingMovies.count + 1,
        },
      });
    } else {
      await database.createRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: {
          searchTerm: query,
          movie_id: movie.id,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.title,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
