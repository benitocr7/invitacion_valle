export type Invitado = { nombre: string; tratamiento: string };

export const datosEvento = {
  evento: "Inauguración",
  iglesia: "Iglesia",
  sede: "Valle",
  fecha: "Sábado, 12 de septiembre de 2026",
  hora: "08H00",
  horaDetalle: "8 de la mañana",
  lugar: "Lugar:",
  direccion: "Valle – Loja, calles Cuenca y Chone",
};

const S = "Estimada Srta.";
const R = "Estimado Sr.";

const invitados: Array<[string, string]> = [
  ["Anahí Masaquiza", S],
  ["Apolonia De Las Mercedes Garcia Moreno", S],
  ["Arellys Denisse Ronquillo Jaramillo", S],
  ["Carlos Fernando Sarango Sarango", R],
  ["Celia Benitez Cajamarca", S],
  ["Claudia Sofia Medina León", S],
  ["Darwin Rojas", R],
  ["Denisse Elizabeth Jaramillo Tacuri", S],
  ["Edixon Humberto Calva Jimenez", R],
  ["Elvia Narcisa Cabrera Yanangomez", S],
  ["Elvia Rocio Zuñiga Calle", S],
  ["Erick Daniel Morales Sarango", R],
  ["Eunice Salomé Medina León", S],
  ["Fernando Bolivar Cuenca Jaramillo", R],
  ["Familia Valdiviezo Lituma", "Estimada"],
  ["Franco Soto Camacho", R],
  ["Fredy Augusto Romero Parra", R],
  ["Gabriela Alexandra Proaño Mosquera", S],
  ["Gadi Raquel Jaramillo Tacurí", S],
  ["Gilvia Natty Vivas Beltran Vda. de Choque", S],
  ["Glenda Andrea Lituma Ortiz", S],
  ["Gloria Levita Hurtado Sánchez", S],
  ["Guissella Nícol Morales Sarango", S],
  ["Herman Vega Palacios", R],
  ["Hilda Velezaca", S],
  ["Ideli Elizabeth Jumbo Medina", S],
  ["Irma Alejandrina Sánchez Marca", S],
  ["Jenny Margoth Carpio Carpio", S],
  ["Jhonny Margoth Medina Leon", R],
  ["Jorge Israel Padilla Muñoz", R],
  ["Jose Voltaire Morales Guachizaca", R],
  ["José Agustin Jumbo Sarango", R],
  ["Julia Victoria Alulima Paltin", S],
  ["Lady Vásconez", S],
  ["Lady Yessenia Vásconez Obando", S],
  ["Linda Maritza Espinoza Hurtado", S],
  ["Luis Alberto Lara Jimenez", R],
  ["Luz Marina Gaona Gaona", S],
  ["Manuel Andrés Ronquillo Ordóñez", R],
  ["Maria Carmen Sanchez Sarango", S],
  ["Maria Fernanda Cevallos Lopez", S],
  ["Maria Soledad Benitez", S],
  ["Mario Rafael Iñiguez Cabrera", R],
  ["Mónica Elizabeth Medina Leon", S],
  ["Nancy Mariela Chamorro Saritama", S],
  ["Nestor Emmanuel Jaramillo Tacuri", R],
  ["Nicole Helena Frugone Garcia", S],
  ["Noemí Eliana Jaramillo Tacuri", S],
  ["Norka Patricia Choque Vivas De Aillón", S],
  ["Norma Isabel Sanchez Sarango", S],
  ["Olga Lucia Vicente Aniceto", S],
  ["Olivia De Jesus Jaramillo Cango", S],
  ["Rebeca Itamar Ordonez Sarango", S],
  ["Rosa Esterfilia León", S],
  ["Segundo Daniel Samaniego Ordoñez", R],
  ["Silvana Yanina Vasconez Obando", S],
  ["Susana Emperatriz Carrera Medina", S],
  ["Veronica Cristina Proaño Mosquera", S],
  ["Veronica Marisol Barros Burneo", S],
  ["Vicente Manuel Alvarado Pinzón", R],
  ["Virginia Torres", S],
  ["Zaida Estefanía Sócola Barzallo", S],
];

function crearSlug(nombre: string) {
  return nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const invitadosPorSlug: Record<string, Invitado> = Object.fromEntries(
  invitados.map(([nombre, tratamiento]) => [crearSlug(nombre), { nombre, tratamiento }])
);
