# LABmedical :hospital:

LABmedical is an application built with Angular version 17.3.0 and aims to manage hospital patients, exams, and appointments. Initially conceived as an evaluative project for a course, it does not yet have a backend. User data is saved in localStorage and patient data in the JSON Server.

With it, it is possible to register all patient information quickly and safely. Designed to provide all information simply, linking the patient to their appointments and exams and making it possible to edit all information, as needed by the user (doctors and nurses).

## Features

**Login and registration screen**: Allows quick user registration and system authentication. The following features can only be viewed after authentication. User data is saved in the browser’s localStorage. Authentication is given by the isLogged: True key that will be stored in localStorage after successful login.  

**Home screen**: Allows you to view statistics on the number of patients, appointments, and exams. It also brings a quick search for patients by name, where it is possible to filter the patients who are viewed through a card on this screen. The patient’s card shows a summary of the patient’s data and provides a button for the complete registration where, in addition to showing the complete patient record, it allows editing these data. In addition to editing, it is possible to delete patients at this time, as long as they do not have exams or appointments linked to them.  

**Registrations**: There are 3 registration forms in the system. One for patient registration, one for appointment registration, and another for exam registration. The registration of appointments and exams requires that a patient from the list of registered patients be selected. Just filter the patient by name and select him from the list. Every exam and appointment is linked to the patient, including the patient’s registration ID in the exam and/or appointment.  

**Medical records**: On the screen that lists the medical records, it is possible to quickly view all patients, including ID, name, and health insurance of the patient. There is also a search field to facilitate the search for the patient, using the name. By clicking on the medical record folder next to the patient’s ID, the user is directed to that patient’s medical record, where it is possible to view some specific care data with the patient, in addition to all data related to exams and appointments performed by that patient. Appointments and exams are listed in chronological order, from the most recent to the oldest. An edit button for appointments and exams is also provided on this page, where the user will be directed to the registration screen, allowing to edit and even delete exams and appointments.

## How to use

1. Clone the project to your machine.
2. Make sure you have Node.js, npm, and Angular CLI installed on your machine. If not, you will need to install them.
3. Navigate to the project directory and install all project dependencies by running the `npm install` command.
4. Start the database server by running `json-server --watch db.json`.
5. In a new terminal, run the `ng serve` command to start the development server.
6. Open the browser and access `http://localhost:4200/`.

## Project Dependencies

This project was built using the following technologies and libraries:

- Angular (version 17.3.0)
- Angular Material
- Bootstrap (via CDN)
- Ngx-Mask
- Moment.js
- RxJS

- - - - - - - - - - - - - - - - - - -

# LABmedical

O LABmedical é uma aplicação construída com a versão 17.3.0 do Angular e tem como objetivo o gerenciamento hospitalar de pacientes, exames e consultas. 
Inicialmente pensada como projeto avaliativo de um curso, ainda não possui backend. Dados dos usuários são salvos no localStorage e dados dos pacientes no JSON Server.

Com ele é possível registrar todas as informações do paciente de forma rápida e segura. 
Projetado para disponibilizar todas as informações de forma simples, vinculando o paciente às suas consultas e exames e tornando possível a edição de todas as informações, conforme necessidade do usuário (médicos e enfermeiros).

## Recursos

**Tela de login e cadastro**: Permite o cadastro rápido de usuários e a autenticação no sistema. Os recursos a seguir só podem ser visualizados após a autenticação. Os dados de usuários são salvos no localStorage do navegador. A autenticação se dá pela chave isLogged: True que ficará armazenada no localStorage após login efetuado com sucesso.  

**Tela inicial (home)**: Permite visualizar estatísticas de quantidade de pacientes, consultas e exames. Também traz uma busca rápida de pacientes pelo nome, onde é possível filtrar os pacientes que são visualizados através de um card nessa tela. O card do paciente mostra um resumo dos dados do paciente e dispobiliza um botão para o cadastro completo onde, além de mostrar a ficha completa do paciente, permite editar esses dados. Além de editar, é possível excluir pacientes nesse momento, desde que o mesmo não possua exames ou consultas vinculadas a ele.  

**Cadastros**: Há 3 formulários de cadastro no sistema. Um para cadastro de paciente, um para cadastro de consultas e outro para cadastro de exames. O cadastro de consultas e exames exige que seja selecionado um paciente da lista de pacientes cadastrados. Basta filtrar o paciente pelo nome e selecioná-lo na lista. Todo exame e consulta fica vinculado ao paciente, incluindo a ID de cadastro do paciente no exame e/ou consulta.  

**Prontuários**: Na tela que lista os prontuários, é possível visualizar rapidamente todos os pacientes, incluindo ID, nome e convênio de saúde do paciente. Também há um campo de busca para facilitar a busca pelo paciente, utilizando o nome. Ao clicar na pasta do prontuário ao lado da ID do paciente, o usuário é direcionado para o prontuário daquele paciente, onde é possível visualizar alguns dados específicos de cuidados com o paciente, além de todos os dados relacionados a exames e consultas realizadas por aquele paciente. As consultas e exames estão listadas em ordem cronológica, do mais recente para o mais antigo. Também é disponibilizado um botão de edição para consultas e exames nessa página, onde o usuário será direcionado até a tela de cadastro, permitindo editar e até deletar exames e consultas.

## Como usar

1. Faça o clone do projeto para sua máquina.
2. Certifique-se de ter o Node.js, npm e Angular CLI instalados na sua máquina. Se não tiver, você precisará instalá-los.
3. Navegue até o diretório do projeto e instale todas as dependências do projeto executando o comando `npm install`.
4. Inicie o servidor do banco de dados executando `json-server --watch db.json`.
5. Em um novo terminal, execute o comando `ng serve` para iniciar o servidor de desenvolvimento.
6. Abra o navegador e acesse `http://localhost:4200/`.

## Dependências do Projeto

Este projeto foi construído usando as seguintes tecnologias e bibliotecas:

- Angular (versão 17.3.0)
- Angular Material
- Bootstrap (via CDN)
- Ngx-Mask
- Moment.js
- RxJS


