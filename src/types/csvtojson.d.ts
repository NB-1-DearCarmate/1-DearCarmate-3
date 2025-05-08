declare module 'csvtojson' {
  interface Converter {
    fromFile(path: string): Promise<any[]>;
  }

  function csv(): Converter;

  export default csv;
}
