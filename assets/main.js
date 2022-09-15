
const API = "https://youtube-v31.p.rapidapi.com/search?channelId=UCww-BwaBqNytgwPfbPAk70A&part=snippet%2Cid&order=date&maxResults=10https://youtube-v31.p.rapidapi.com/search?channelId=UCww-BwaBqNytgwPfbhttps://youtube-v31.p.rapidapi.com/search?channelId=UCww-BwaBqNytgwPfbPAk70A&part=snippet%2Cid&order=date&maxResults=10PAk70A&part=snippet%2Cid&order=date&maxResults=10"

const content = null|| document.getElementById('content');//Y ahora para que pueda leer la lógica de main, dado que el id lo llamamos content, en el archivo main agregamos la referencia content
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '805fe4befemshbc04bfcdc6f0b9ap1fe832jsn2eabcb3fdf5a',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};
//Lógica de async: ir por los datos, luego esperar por ellos y finalmente retornarlos hacia el usuario
async function fetchData(urlApi){ //siempre async antes de function
	const response = await fetch(urlApi, options); //hacemos uso del fetch() y solo por esta vez le pasamos la opciones 
	const data = await response.json();//estructura de los datos transformandolos en json
	return data;
}
// Ahora vamos usar un nuevo concepto: una función que se invoca a sí misma; con JavaScript podemos tener funciones anónimas que permitan llamarse automáticamente, la estructura cuenta con la palabra reservada **async **y con funciones arrows:
(async () => {
	//Dentro implementamos la lógica necesaria para hacer el llamado a la API, obtener los elementos y mostrarlos en html
//Se implementa try y catch
// Dentro de try{} estará el llamado de la API y el template de html para interpretar los datos a iterar por cada objeto, en este caso, cuando analizamos la salida de la API en rapidapi, hay una jerarquía de los datos, están los 9 “items” del 0 al 8 para la posición de cada vídeo, luego el “snippet” de cada item, luego “thumbnails” y éste a su vez los tamaños de la imagen (nos interesa con la más alta resolución “high”), también nos interesa mostrar la descripción “description” y nombre “title” de cada vídeo:
	try{
		const videos = await fetchData(API);
		let view = `
		${videos.items.map(video => `
			
		<a href="https://youtube.com/watch?v=${video.id.videoId}" target ="_blank"> 
			<div class="group relative">
				<div
		  			class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
		  			<img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
				</div>
				<div class="mt-4 flex justify-between">
		  			<h3 class="text-sm text-gray-700">
					<span aria-hidden="true" class="absolute inset-0"></span>
					${video.snippet.title}
		  			</h3>
				</div>
	  		</div>
		`).slice(0,4).join('')}
			`;
	content.innerHTML = view;//innerHTML es igual a la vista que se ha creado e itera con el metodo map y devuelve un nuevo arreglo con los elementos que queremos obtener como el título, la descripción, la imagen miniatura de la AP
	}catch (error){
		console.log(error); 
	}
})();

// Si quieres saber más del método map, en el enlace hay ejemplos: aquí
// Para el método slice: aquí
// Para el método join: aquí
// En index.html buscamos el comentario de <!-- content --> para agregar el id de **++content ++**y pueda mostrar los vídeos en la landing, para ello, borramos el div después del comentario, incluyendo su contenido, queda así:
/* <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" id="content">
<!-- content -->
</div> */
// const content = null|| document.getElementById('content');//Y ahora para que pueda leer la lógica de main, dado que el id lo llamamos content, en el archivo main agregamos la referencia content, lo ponemos al inicio