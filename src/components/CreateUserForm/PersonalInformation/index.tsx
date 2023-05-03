import React from 'react'
import './style.css'
import axios from 'axios';

type UserData = {
  cep: string,
  rua: string,
  bairro: string,
  cidade: string,
  estado: string,
  logradouro: string,
  complemento: string,
  telefone: string
}

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
}

export function PersonalInformation({ cep, rua, bairro, cidade, estado, logradouro, complemento, telefone, updateFields }: UserFormProps) {

  const [cepError, setCepError] = React.useState(false);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const isValidCep = value.length === 8;
    updateFields({ cep: value });

    if (isValidCep) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
        const { data } = response;

        updateFields({
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
          complemento: data.complemento,
          telefone: data.telefone
        });
        setCepError(false);
      } catch (error) {
        setCepError(true);
      }
    } else {
      updateFields({
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
        complemento: '',
        telefone: '',
      });
      setCepError(false);
    }
  };


  return (
    <div className="cont">
      <div className="row">
        <div className="first-box-local">
          <h1>CEP</h1>
          <input
            required
            type="text"
            placeholder="CEP"
            value={cep}
            onChange={handleCepChange}
            className={cepError ? 'error' : ''}
          />
        </div>
        <div className="second-box-local">
          <h1>Rua</h1>
          <input
            required
            type="text"
            placeholder="Rua"
            value={rua}
            onChange={e => updateFields({ rua: e.target.value })}
          />
        </div>
      </div>
      <div className="row">
        <div className="third-box">
          <h1>Bairro</h1>
          <input
            required
            type="text"
            placeholder="Bairro"
            value={bairro}
            onChange={e => updateFields({ bairro: e.target.value })}
          />
        </div>
        <div className="fourth-box">
          <h1>Cidade</h1>
          <input
            required
            type="text"
            placeholder="Cidade"
            value={cidade}
            onChange={e => updateFields({ cidade: e.target.value })}
          />
        </div>

        <div className="fifth-box">
          <h1>Estado</h1>
          <input
            required
            type="text"
            placeholder="Estado"
            value={estado}
            onChange={e => updateFields({ estado: e.target.value })}
          />
        </div>
      </div>
      <div className="row">
        <div className="sixth-box">
          <h1>Número</h1>
          <input
            required
            type="number"
            placeholder="Número"
            value={logradouro}
            onChange={e => updateFields({ logradouro: e.target.value })}
          />
        </div>
        <div className="seventh-box">
          <h1>Complemento</h1>
          <input
            required
            type="text"
            placeholder="Complemento"
            value={complemento}
            onChange={e => updateFields({ complemento: e.target.value })}
          />
        </div>
        <div className="seventh-box">
          <h1>Telefone</h1>
          <input
            required
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={e => updateFields({ telefone: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}