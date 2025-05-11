import React, { useEffect, useState } from 'react';
import { Input } from '../../components/ui/aceternityInput';
import { Button } from '../../components/ui/button';
import { fetchWrapper } from '../../utils/fetchWrapper';

// Panel Components
export function AdminHome() {
  return (
    <div className="w-full h-full text-white p-8 space-y-6 overflow-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p>Welcome, Admin. Manage users, questions, answers and more.</p>
    </div>
  );
}

export function QuestionsPanel() {
const [questions, setQuestions] = useState([]);
const [form, setForm] = useState({ verbiage: '' });
const [selectedId, setSelectedId] = useState('');
const [searchId, setSearchId] = useState('');

const fetchQuestions = async () => {
    const res = await fetchWrapper('https://localhost:7219/api/Questions');
    const data = await res.json();
    
    setQuestions(data);
};

const handleCreate = async () => {
    const res = await fetchWrapper('https://localhost:7219/api/Questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchQuestions();
};

const handleUpdate = async () => {
    if (!selectedId) return alert('Select a question to update.');
    const res = await fetchWrapper('https://localhost:7219/api/Questions', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedId, ...form }),
    });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchQuestions();
};

const handleDelete = async (id) => {
    const res = await fetchWrapper(`https://localhost:7219/api/Questions/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchQuestions();
};

const handleSearch = async () => {
    const res = await fetchWrapper(`https://localhost:7219/api/Questions/${searchId}`);
    if (res.status === 204) {
      alert("The id you are trying to search does not exist.");
      return;
    }
    const data = await res.json();
    if (data.message) alert(data.message);
    setQuestions([data]);
};

useEffect(() => {
    fetchQuestions();
}, []);

return (
    <div className="w-full h-full text-white p-8 space-y-6 overflow-auto">
    <h1 className="text-3xl font-bold mb-4">Questions Panel</h1>

    <div className="flex items-center gap-2">
        <Input type="text" placeholder="Search by ID" value={searchId} onChange={e => setSearchId(e.target.value)} />
        <Button variant="secondary" onClick={handleSearch}>Search</Button>
        <Button
          variant="secondary"
          onClick={() => {
            fetchQuestions();
            setForm({ verbiage: '' });
            setSearchId('');
            setSelectedId('');
          }}
        >
          Reset
        </Button>
    </div>

    <div className="grid grid-cols-1 gap-4 max-w-4xl">
        <Input
        placeholder="verbiage"
        value={form.verbiage}
        onChange={e => setForm({ ...form, verbiage: e.target.value })}
        />
    </div>

    <div className="flex gap-4">
        <Button variant="secondary" onClick={handleCreate}>Create Question</Button>
        <Button variant="secondary" onClick={handleUpdate}>Update Selected</Button>
    </div>

    <table className="w-full table-auto border border-white mt-6">
        <thead>
        <tr>
            {['ID', 'Verbiage', 'Actions'].map(h => (
            <th key={h} className="border px-4 py-2">{h}</th>
            ))}
        </tr>
        </thead>
        <tbody>
        {questions.map(q => (
            <tr key={q.id} className="border">
            <td className="px-4 py-2">{q.id}</td>
            <td className="px-4 py-2">{q.verbiage}</td>
            <td className="px-4 py-2 flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => { setForm({ verbiage: q.verbiage }); setSelectedId(q.id); }}>Edit</Button>
                <Button size="sm" variant="secondary" onClick={() => handleDelete(q.id)}>Delete</Button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);
}

export function QuestionChoicesPanel() {
  const [choices, setChoices] = useState([]);
  const [form, setForm] = useState({ questionId: '', choice: '' });
  const [selectedId, setSelectedId] = useState('');
  const [searchId, setSearchId] = useState('');

  const fetchChoices = async () => {
    const res = await fetchWrapper('https://localhost:7219/api/QuestionChoices');
    const data = await res.json();
    setChoices(data);
  };

  const handleCreate = async () => {
    const res = await fetchWrapper('https://localhost:7219/api/QuestionChoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchChoices();
  };

  const handleUpdate = async () => {
    if (!selectedId) return alert('Select a choice to update.');

    const res = await fetchWrapper(`https://localhost:7219/api/QuestionChoices`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedId, ...form }),
    });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchChoices();
  };


  const handleDelete = async (id) => {
    const res = await fetchWrapper(`https://localhost:7219/api/QuestionChoices/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchChoices();
  };

  const handleSearch = async () => {
    const res = await fetchWrapper(`https://localhost:7219/api/QuestionChoices/${searchId}`);
    if (res.status === 204) {
      alert("The id you are trying to search does not exist.");
      return;
    }
    const data = await res.json();
    if (data.message) alert(data.message);
    setChoices([data]);
  };

  useEffect(() => {
    fetchChoices();
  }, []);

  return (
    <div className="w-full h-full text-white p-8 space-y-6 overflow-auto">
      <h1 className="text-3xl font-bold mb-4">Question Choices Panel</h1>

      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <Button variant="secondary" onClick={handleSearch}>Search</Button>
        <Button
          variant="secondary"
          onClick={() => {
            fetchChoices();
            setForm({ questionId: '', choice: '' });
            setSearchId('');
            setSelectedId('');
          }}
        >
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-4xl">
        <Input
          placeholder="questionId"
          value={form.questionId}
          onChange={(e) => setForm({ ...form, questionId: e.target.value })}
        />
        <Input
          placeholder="choice"
          value={form.choice}
          onChange={(e) => setForm({ ...form, choice: e.target.value })}
        />
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={handleCreate}>Create Choice</Button>
        <Button variant="secondary" onClick={handleUpdate}>Update Selected</Button>
      </div>

      <table className="w-full table-auto border border-white mt-6">
        <thead>
          <tr>
            {['ID', 'Question ID', 'Choice', 'Actions'].map((h) => (
              <th key={h} className="border px-4 py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {choices.map((c) => (
            <tr key={c.id} className="border">
              <td className="px-4 py-2">{c.id}</td>
              <td className="px-4 py-2">{c.questionId}</td>
              <td className="px-4 py-2">{c.choice}</td>
              <td className="px-4 py-2 flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => { setForm(c); setSelectedId(c.id); }}>Edit</Button>
                <Button size="sm" variant="secondary" onClick={() => handleDelete(c.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PersonalitiyTypePanel() {
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', description: '' });
  const [searchId, setSearchId] = useState('');

  const fetchAll = async () => {
    const res = await fetchWrapper('https://localhost:7219/api/PersonalityType');
    const data = await res.json();
    setTypes(data);
  };

  const fetchById = async () => {
    const res = await fetchWrapper(`https://localhost:7219/api/PersonalityType/${searchId}`);
    if (res.status === 204) {
      alert("The id you are trying to search does not exist.");
      return;
    }
    const data = await res.json();
    if (data.message) alert(data.message);
    setTypes([data]);
  };

  const handleCreate = async () => {
    const res = await fetchWrapper('https://localhost:7219/api/PersonalityType', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchAll();
  };

  const handleUpdate = async () => {
    const res = await fetchWrapper('https://localhost:7219/api/PersonalityType', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchAll();
  };

  const handleDelete = async (id) => {
    const res = await fetchWrapper(`https://localhost:7219/api/PersonalityType?id=${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="w-full h-full text-white p-8 space-y-6 overflow-auto">
      <h1 className="text-3xl font-bold mb-4">Personality Type Panel</h1>

      <div className="flex gap-2">
        <Input placeholder="Search by ID" value={searchId} onChange={e => setSearchId(e.target.value)} />
        <Button variant="secondary" onClick={fetchById}>Search</Button>
        <Button
          variant="secondary"
          onClick={() => {
            fetchAll();
            setForm({ id: '', name: '', description: '' });
            setSearchId('');
          }}
        >
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-4xl">
        <Input placeholder="ID" value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} />
        <Input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <Input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={handleCreate}>Create</Button>
        <Button variant="secondary" onClick={handleUpdate}>Update</Button>
      </div>

      <table className="w-full table-auto border border-white mt-6">
        <thead>
          <tr>
            {['ID', 'Name', 'Description', 'Actions'].map(h => (
              <th key={h} className="border px-4 py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {types.map(type => (
            <tr key={type.id} className="border">
              <td className="px-4 py-2">{type.id}</td>
              <td className="px-4 py-2">{type.name}</td>
              <td className="px-4 py-2">{type.description}</td>
              <td className="px-4 py-2 flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => setForm(type)}>Edit</Button>
                <Button size="sm" variant="secondary" onClick={() => handleDelete(type.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PersonalityAnswerPanel() {
  const [answers, setAnswers] = useState([]);
  const [form, setForm] = useState({
    id: 0,
    personalityTypeId: 0,
    questionId: 0,
    choiceId: 0,
  });
  const [searchId, setSearchId] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const fetchAnswers = async () => {
    const res = await fetchWrapper('https://localhost:7219/api/PersonalityAnswer');
    const data = await res.json();
    setAnswers(data);
  };

  const handleSearch = async () => {
    const res = await fetchWrapper(`https://localhost:7219/api/PersonalityAnswer/${searchId}`);
    if (res.status === 204) {
      alert("The id you are trying to search does not exist.");
      return;
    }
    const data = await res.json();
    if (data.message) alert(data.message);
    setAnswers([data]);
  };

  const handleCreate = async () => {
    const res = await fetchWrapper('https://localhost:7219/api/PersonalityAnswer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchAnswers();
  };

  const handleUpdate = async () => {
    if (!selectedId) return alert('Select a row to update.');
    const res = await fetchWrapper('https://localhost:7219/api/PersonalityAnswer', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchAnswers();
  };

  const handleDelete = async (id) => {
    const res = await fetchWrapper(`https://localhost:7219/api/PersonalityAnswer/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchAnswers();
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  return (
    <div className="w-full h-full text-white p-8 space-y-6 overflow-auto">
      <h1 className="text-3xl font-bold mb-4">Personality Answer Panel</h1>

      <div className="flex gap-2">
        <Input placeholder="Search by ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        <Button variant="secondary" onClick={handleSearch}>Search</Button>
        <Button
          variant="secondary"
          onClick={() => {
            fetchAnswers();
            setForm({
              id: 0,
              personalityTypeId: 0,
              questionId: 0,
              choiceId: 0,
            });
            setSearchId('');
            setSelectedId(null);
          }}
        >
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-3xl">
        {['id', 'personalityTypeId', 'questionId', 'choiceId'].map((field) => (
          <Input
            key={field}
            placeholder={field}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: Number(e.target.value) })}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={handleCreate}>Create</Button>
        <Button variant="secondary" onClick={handleUpdate}>Update Selected</Button>
      </div>

      <table className="w-full border mt-6 table-auto">
        <thead>
          <tr>
            {['ID', 'PersonalityTypeId', 'QuestionId', 'ChoiceId', 'Actions'].map((h) => (
              <th key={h} className="border px-4 py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {answers.map((item) => (
            <tr key={item.id} className="border">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.personalityTypeId}</td>
              <td className="px-4 py-2">{item.questionId}</td>
              <td className="px-4 py-2">{item.choiceId}</td>
              <td className="px-4 py-2 flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => { setForm(item); setSelectedId(item.id); }}>Edit</Button>
                <Button size="sm" variant="secondary" onClick={() => handleDelete(item.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FantasyUserPersonalityAssociationPanel() {
  const [associations, setAssociations] = useState([]);
  const [form, setForm] = useState({ id: '', fantasyUserId: '', personalityTypeId: '' });
  const [selectedId, setSelectedId] = useState('');
  const [searchId, setSearchId] = useState('');
  const [calcInput, setCalcInput] = useState({ userId: '', questionChoiceIds: '' });

  const fetchAll = async () => {
    const res = await fetchWrapper('https://localhost:7219/api/FantasyUserPersonalityAssociation');
    const data = await res.json();
    setAssociations(data);
  };

  const handleCreate = async () => {
    const res = await fetchWrapper('https://localhost:7219/api/FantasyUserPersonalityAssociation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchAll();
  };

  const handleUpdate = async () => {
    const res = await fetchWrapper('https://localhost:7219/api/FantasyUserPersonalityAssociation', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedId, ...form }),
    });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchAll();
  };

  const handleDelete = async (id) => {
    const res = await fetchWrapper(`https://localhost:7219/api/FantasyUserPersonalityAssociation/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchAll();
  };

  const handleSearch = async () => {
    const res = await fetchWrapper(`https://localhost:7219/api/FantasyUserPersonalityAssociation/${searchId}`);
    if (res.status === 204) {
      alert("The id you are trying to search does not exist.");
      return;
    }
    const data = await res.json();
    if (data.message) alert(data.message);
    setAssociations([data]);
  };

  const handleCalculate = async () => {
    const res = await fetchWrapper('https://localhost:7219/api/FantasyUserPersonalityAssociation/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: Number(calcInput.userId),
        questionChoiceIds: calcInput.questionChoiceIds.split(',').map(id => Number(id.trim())),
      }),
    });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="w-full h-full text-white p-8 space-y-6 overflow-auto">
      <h1 className="text-3xl font-bold mb-4">Fantasy User Personality Association Panel</h1>

      <div className="flex items-center gap-2">
        <Input placeholder="Search by ID" value={searchId} onChange={e => setSearchId(e.target.value)} />
        <Button variant="secondary" onClick={handleSearch}>Search</Button>
        <Button
          variant="secondary"
          onClick={() => {
            fetchAll();
            setForm({ id: '', fantasyUserId: '', personalityTypeId: '' });
            setSearchId('');
            setSelectedId('');
            setCalcInput({ userId: '', questionChoiceIds: '' });
          }}
        >
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-4xl">
        {['id', 'fantasyUserId', 'personalityTypeId'].map(field => (
          <Input
            key={field}
            placeholder={field}
            value={form[field]}
            onChange={e => setForm({ ...form, [field]: e.target.value })}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={handleCreate}>Create</Button>
        <Button variant="secondary" onClick={handleUpdate}>Update</Button>
      </div>

      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Calculate Personality</h2>
        <div className="flex gap-2">
          <Input placeholder="User ID" value={calcInput.userId} onChange={e => setCalcInput({ ...calcInput, userId: e.target.value })} />
          <Input placeholder="QuestionChoiceIds (comma-separated)" value={calcInput.questionChoiceIds} onChange={e => setCalcInput({ ...calcInput, questionChoiceIds: e.target.value })} />
          <Button variant="secondary" onClick={handleCalculate}>Calculate</Button>
        </div>
      </div>

      <table className="w-full table-auto border border-white mt-6">
        <thead>
          <tr>
            {['ID', 'User ID', 'Personality ID', 'Actions'].map(h => (
              <th key={h} className="border px-4 py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {associations.map(item => (
            <tr key={item.id} className="border">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.fantasyUserId}</td>
              <td className="px-4 py-2">{item.personalityTypeId}</td>
              <td className="px-4 py-2 flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => { setForm(item); setSelectedId(item.id); }}>Edit</Button>
                <Button size="sm" variant="secondary" onClick={() => handleDelete(item.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function UserPanel() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    dateOfBirth: '',
    profilePicturePath: '',
    role: ''
  });
  const [selectedId, setSelectedId] = useState('');
  const [searchId, setSearchId] = useState('');

  const fetchUsers = async () => {
    const res = await fetchWrapper('https://localhost:7244/api/FantasyUsers');
    const data = await res.json();
    setUsers(data);
  };

  const handleCreate = async () => {
    const res = await fetchWrapper('https://localhost:7244/api/FantasyUsers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok && data.errors) {
      const messages = Object.entries(data.errors)
        .flatMap(([field, messages]) => messages.map(msg => `${field}: ${msg}`))
        .join('\n');
      alert(messages);
      return;
    }

    if (data.message) alert(data.message);
    fetchUsers();
  };

  const handleUpdate = async () => {
    if (!selectedId) return alert('Select a user to update.');
    const res = await fetchWrapper('https://localhost:7244/api/FantasyUsers', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedId, ...form }),
    });
    const data = await res.json();

    if (!res.ok && data.errors) {
      const messages = Object.entries(data.errors)
        .flatMap(([field, messages]) => messages.map(msg => `${field}: ${msg}`))
        .join('\n');
      alert(messages);
      return;
    }

    if (data.message) alert(data.message);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    const res = await fetchWrapper(`https://localhost:7244/api/FantasyUsers/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchUsers();
  };

  const handleSearch = async () => {
    const res = await fetchWrapper(`https://localhost:7244/api/FantasyUsers/${searchId}`);
    if (res.status === 204) {
      alert("The id you are trying to search does not exist.");
      return;
    }
    const data = await res.json();
    if (data.message) alert(data.message);
    setUsers([data]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full h-full text-white p-8 space-y-6 overflow-auto">
      <h1 className="text-3xl font-bold mb-4">User Panel</h1>

      <div className="flex items-center gap-2">
        <Input type="text" placeholder="Search by ID" value={searchId} onChange={e => setSearchId(e.target.value)} />
        <Button variant="secondary" onClick={handleSearch}>Search</Button>
        <Button
          variant="secondary"
          onClick={() => {
            fetchUsers();
            setForm({
              name: '',
              surname: '',
              username: '',
              email: '',
              password: '',
              dateOfBirth: '',
              profilePicturePath: '',
              role: ''
            });
            setSearchId('');
            setSelectedId('');
          }}
        >
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-4xl">
        {['name', 'surname', 'username', 'email', 'password', 'dateOfBirth', 'profilePicturePath', 'role'].map(field => (
          <Input
            key={field}
            placeholder={field}
            value={form[field]}
            onChange={e => setForm({ ...form, [field]: e.target.value })}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={handleCreate}>Create User</Button>
        <Button variant="secondary" onClick={handleUpdate}>Update Selected</Button>
      </div>

      <table className="w-full table-auto border border-white mt-6">
        <thead>
          <tr>
            {['ID', 'Name', 'Surname', 'Email', 'Role', 'Actions'].map(h => (
              <th key={h} className="border px-4 py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.surname}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2 flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => { setForm(user); setSelectedId(user.id); }}>Edit</Button>
                <Button size="sm" variant="secondary" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function UserRolesPanel() {
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({ id: '', name: '' });
  const [searchId, setSearchId] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const fetchRoles = async () => {
    const res = await fetchWrapper('https://localhost:7244/api/FantasyUserRoles');
    const data = await res.json();
    setRoles(data);
  };

  const handleCreate = async () => {
    const res = await fetchWrapper('https://localhost:7244/api/FantasyUserRoles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchRoles();
  };

  const handleUpdate = async () => {
    const res = await fetchWrapper('https://localhost:7244/api/FantasyUserRoles', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedId, name: form.name }),
    });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchRoles();
  };

  const handleDelete = async (id) => {
    const res = await fetchWrapper(`https://localhost:7244/api/FantasyUserRoles/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.message) alert(data.message);
    fetchRoles();
  };

  const handleSearch = async () => {
    const res = await fetchWrapper(`https://localhost:7244/api/FantasyUserRoles/${searchId}`);
    if (res.status === 204) {
      alert('The id you are trying to search does not exist.');
      return;
    }
    const data = await res.json();
    if (data.message) alert(data.message);
    setRoles([data]);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="w-full h-full text-white p-8 space-y-6 overflow-auto">
      <h1 className="text-3xl font-bold mb-4">User Roles Panel</h1>

      <div className="flex items-center gap-2">
        <Input placeholder="Search by ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        <Button variant="secondary" onClick={handleSearch}>Search</Button>
        <Button
          variant="secondary"
          onClick={() => {
            fetchRoles();
            setForm({ id: '', name: '' });
            setSearchId('');
            setSelectedId('');
          }}
        >
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md">
        <Input placeholder="ID" value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} />
        <Input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      </div>

      <div className="flex gap-4 mt-4">
        <Button variant="secondary" onClick={handleCreate}>Create Role</Button>
        <Button variant="secondary" onClick={handleUpdate}>Update Role</Button>
      </div>

      <table className="w-full table-auto border border-white mt-6">
        <thead>
          <tr>
            {['ID', 'Name', 'Actions'].map(h => (
              <th key={h} className="border px-4 py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id} className="border">
              <td className="px-4 py-2">{role.id}</td>
              <td className="px-4 py-2">{role.name}</td>
              <td className="px-4 py-2 flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => { setForm(role); setSelectedId(role.id); }}>Edit</Button>
                <Button size="sm" variant="secondary" onClick={() => handleDelete(role.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

