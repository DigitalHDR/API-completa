import { useEffect, useState, useRef, FormEvent } from 'react'
import { FiTrash } from 'react-icons/fi'
import { api } from './service/api'

interface CustomerProps {
  id: string
  name: string
  email: string
  status: boolean
  created_at: string
}

export default function App() {
  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadCustomers()
  }, [])

  async function loadCustomers() {
    const response = await api.get('/customers')
    setCustomers(response.data)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!nameRef.current?.value || !emailRef.current?.value) return
    const response = await api.post('/customer', {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
    })
    setCustomers(allCustomers => [...allCustomers, response.data])
    //47:37 esta trocando o que tem dentro de setCustomers,
    //pegando o que já tem dentro dela allCustomers,
    //e jogando dentro de um array [...allCustomers]
    //e devolve na tela o que foi cadastrado response.data

    nameRef.current.value = ''
    emailRef.current.value = ''
  }

  async function handleDelete(id: string) {
    try {
      await api.delete('/customer', {
        params: {
          id: id,
        },
      })

      const allCustomers = customers.filter(customer => customer.id !== id)
      setCustomers(allCustomers)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-10">
      <main className="my-10 w-full md:max-w-2x1">
        <h1 className="text-4x1 font-medium text-white">Clientes</h1>
        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome:</label>
          <input
            type="text"
            placeholder="Digite seu nome completo"
            className="w-full mb-5 p-2 rounded"
            ref={nameRef}
          />
          <label className="font-medium text-white">Email:</label>
          <input
            type="email"
            placeholder="Digite seu Email"
            className="w-full mb-5 p-2 rounded"
            ref={emailRef}
          />
          <input
            type="submit"
            value="Cadastrar"
            className="Cursor-pointer w-full p-2 bg-green-500"
          />
        </form>
        <section className="flex flex-col gap-4">
          {customers.map(customer => (
            <article
              key={customer.id}
              className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200"
            >
              <p>
                <span className="font-medium">Nome: </span>
                {customer.name}
              </p>
              <p>
                <span className="font-medium">Email: </span>
                {customer.email}
              </p>
              <p>
                <span className="font-medium">Status: </span>
                {customer.status ? 'ATIVO' : 'INATIVO'}
              </p>

              <button
                onClick={() => handleDelete(customer.id)}
                className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
              >
                <FiTrash size={18} color="#fff" />
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
