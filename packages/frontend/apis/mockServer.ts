export async function fetchData() {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      const requestUrl = `${baseUrl}/mock-servers`
      console.log(baseUrl, requestUrl);
      const response = await fetch(requestUrl);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
    }
  }
  