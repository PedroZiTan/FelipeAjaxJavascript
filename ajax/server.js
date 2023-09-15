// bodyParser serve para trabalhar com os dados vindo do seu cliente. 
// Quando o cliente manda dados via form payload, esse pacote ele formata
// e transforma os dados para o formato de objeto javascript e joga tudo 
//  isso em um objeto dentro do objeto de requisição (req): req. body.
// O Express oferece soluções para: Gerenciar requisições de diferentes 
// verbos HTTP em diferentes URLs.
//O Multer é um middleware que vai interceptar o 
//upload e salvar o arquivo em uma pasta do disco.
//DiskStorage = O mecanismo de armazenamento em disco oferece controle total sobre o armazenamento de arquivos em disco.
/* destinationé usado para determinar em qual pasta os arquivos carregados devem ser armazenados. Isso também pode ser dado como um string(por exemplo '/tmp/uploads', ). Se nenhum destinationfor fornecido, o diretório padrão do sistema operacional para arquivos temporários será usado.
Nota: Você é responsável por criar o diretório ao fornecer destinationcomo uma função. Ao passar uma string, o Multer garantirá que o diretório seja criado para você.
filenameé usado para determinar como o arquivo deve ser nomeado dentro da pasta. Se nenhum filenamefor fornecido, cada arquivo receberá um nome aleatório que não inclui nenhuma extensão de arquivo.
Nota: Multer não anexará nenhuma extensão de arquivo para você, sua função deve retornar um nome de arquivo completo com uma extensão de arquivo.
Cada função recebe a solicitação ( req) e algumas informações sobre o arquivo ( file) para ajudar na decisão.
Observe que req.bodypode não ter sido totalmente preenchido ainda. Depende da ordem que o cliente transmite campos e arquivos para o servidor.
Para entender a convenção de chamada usada no retorno de chamada (precisando passar nulo como o primeiro parâmetro), consulte Tratamento de erros do Node.js*/
/*.single(fieldname)
Aceite um único arquivo com o nome fieldname. O único arquivo será armazenado em formato req.file.
*/

const bodyParser = require("body-parser")
const express = require("express")
const app = express()

app.use(express.static('.'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const multer = require('multer')

const storage = multer.diskStorage({
   destination: function(req, file, callback) {
      callback(null, './upload')
   },
   filename: function(req, file, callback) {
      callback(null, `${Date.now()}_${file.originalname}`)
   }
})

const upload = multer({storage}).single('arquivo')

app.post('/upload', (req, res) => {
  upload(req, res, err => {
    if(err) {
      return res.end("Ocorreu um erro")
    } else{
      res.end("Concluido com sucesso")
    }
    
  })
})

app.post("/formulario", (req, res) => {
  console.log(req.body)
  res.send({
    ...req.body,
    id: 1
  })
})

app.get("/parOuImpar", (req, res) => {
  //req-body
  //req.query
  //req.params
  const par = parseInt(req.query.numero) % 2 === 0
  res.send({
    resultado: par ? 'par' : 'impar'
  })
})


app.listen(8017, () => console.log("Executando..."))
