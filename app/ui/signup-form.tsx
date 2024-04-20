import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    childName: '',
    age: '',
    parentName: '',
    parentPhoneNumber: '',
    preferredLanguage: '',
  });
const [focusRing, setFocusRing] = useState(false)
const [showPassword, setShowPassword] = useState(false);


const handleTogglePassword = () => {
  setShowPassword((prevShowPassword) => !prevShowPassword);
};

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
   
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if(e.nativeEvent.type !== 'input'){
      setFocusRing(true);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      email: '',
      password: '',
      childName: '',
      age: '',
      parentName: '',
      parentPhoneNumber: '',
      preferredLanguage: '',
    });
  };

  return (
    <>
    
    <form onSubmit={handleSubmit} className="mt-5 space-y-4 flex flex-col w-[655px]">
      <div>
       
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder='Email Address'
          className='border-none rounded-xl w-[655px] p-4'

        />
      </div>
      <div className='relative'>
      
        <input
        type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder='Password'
          className='border-none rounded-xl w-[655px] p-4'
        />
      <div className='absolute top-3 right-4'>
      {!showPassword ? (<svg xmlns="http://www.w3.org/2000/svg" onClick={handleTogglePassword} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
): ( <svg xmlns="http://www.w3.org/2000/svg" onClick={handleTogglePassword} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
<path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
)}
      </div>


      </div>
      <div>
     
        <input
          type="text"
          id="childName"
          name="childName"
          value={formData.childName}
          onChange={handleChange}
          required
          placeholder='Child Name'
          className='border-none rounded-xl w-[655px] p-4'
        />
      </div>
      <div>
   
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          placeholder='Child Age'
          className='border-none rounded-xl w-[655px] p-4'
        />
      </div>
      <div>
     
        <input
          type="text"
          id="parentName"
          name="parentName"
          value={formData.parentName}
          onChange={handleChange}
          required
          placeholder='Parents Name'
          className='border-none rounded-xl w-[655px] p-4'
        />
      </div>
      <div>
       
        <input
          type="tel"
          id="parentPhoneNumber"
          name="parentPhoneNumber"
          value={formData.parentPhoneNumber}
          onChange={handleChange}
          required
          placeholder='Parents Phone Number'
          className='border-none rounded-xl w-[655px] p-4'
        />
      </div>
      <div className={`${focusRing ? `focus:ring-1` : ''} bg-white flex flex-col w-[655px] h-[95px] py-3 px-4 rounded-xl`}
       >
        <label htmlFor="preferredLanguage">Preferred Language</label>
        <select
          id="preferredLanguage"
          name="preferredLanguage"
          value={formData.preferredLanguage}
          onChange={handleChange}
          required
          className='text-gray-400 border-none mt-2 border-transparent focus:border-transparent focus:ring-0'
        >
          <option value="">Select Language</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className='self-center'>
      <button type="submit" className='py-4 px-[140px] bg-[#E6864E] text-white font-bold text-3xl rounded-[70px]'>Sign Up</button>
      </div>

    </form>
    <p className='mt-4 text-lg text-gray-500'>Already have an account ? <Link href="/login" className='font-bold text-black'>Log In</Link> </p>
    </>
  );
}
