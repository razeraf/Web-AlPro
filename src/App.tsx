import { useState } from "react";
import "./index.css";

type Pengeluaran = {
  nama: string;
  kategori: string;
  jumlah: number;
};

function App() {
  const [tujuan, setTujuan] =
    useState("");

  const [durasi, setDurasi] =
    useState(0);

  const [budget, setBudget] =
    useState(0);

  const [setup, setSetup] =
    useState(false);

  const [nama, setNama] =
    useState("");

  const [kategori, setKategori] =
    useState("");

  const [jumlah, setJumlah] =
    useState(0);

  const [search, setSearch] =
    useState("");

  const [daftar, setDaftar] =
    useState<Pengeluaran[]>([]);

  function formatRupiah(
    angka: number
  ) {

    return new Intl.NumberFormat(
      "id-ID"
    ).format(angka);

  }


  function isJawa() {

    return [

      "jakarta",
      "bandung",
      "surabaya",
      "semarang",
      "malang",
      "yogyakarta",

    ].some((x)=>

      tujuan
        .toLowerCase()
        .includes(x)

    );

  }


  function minBudget() {

    return isJawa()
      ? 800000
      : 2000000;

  }


  function setupTrip() {

    if (

      budget <
      minBudget()

    ) {

      alert(

        `Minimal budget Rp ${formatRupiah(
          minBudget()
        )}`

      );

      return;

    }

    setSetup(true);

  }


  function tambah() {

    if (

      nama === "" ||
      kategori === "" ||
      jumlah <= 0

    ) return;


    setDaftar([

      ...daftar,

      {
        nama,
        kategori,
        jumlah,
      },

    ]);


    setNama("");
    setKategori("");
    setJumlah(0);

  }



  function hapus(
    index: number
  ) {

    setDaftar(

      daftar.filter(
        (_, i)=> i !== index
      )

    );

  }



  function sortAsc() {

    const hasil =
      [...daftar].sort(

        (a,b)=>

          a.jumlah -
          b.jumlah

      );

    setDaftar(
      hasil
    );

  }



  function sortDesc() {

    const hasil =
      [...daftar].sort(

        (a,b)=>

          b.jumlah -
          a.jumlah

      );

    setDaftar(
      hasil
    );

  }



  const total =
    daftar.reduce(

      (a,b)=>

        a +
        b.jumlah,

      0

    );



  return (

<div className="container">

<div className="hero">

<h1>
✈️ Budget Travelling
</h1>

<p>

Atur budget,
pengeluaran,
dan laporan perjalanan

</p>

</div>



<div className="card">

{

!setup ?

(

<>

<h2>
Setup Perjalanan
</h2>


<input

placeholder="Tujuan"

onChange={(e)=>

setTujuan(
e.target.value
)

}

/>



<input

type="number"

placeholder="Durasi (hari)"

onChange={(e)=>

setDurasi(
Number(
e.target.value
)
)

}

/>



<input

type="number"

placeholder="Budget"

onChange={(e)=>

setBudget(
Number(
e.target.value
)
)

}

/>



<button
onClick={
setupTrip
}
>

Mulai

</button>

</>

)

:

(

<>

<h2>
Profil Perjalanan
</h2>


<p>
📍 {tujuan}
</p>

<p>
🗓️ {durasi} hari
</p>

<p>

💰 Rp

{formatRupiah(
budget
)}

</p>


<hr />


<h2>

Tambah
Pengeluaran

</h2>



<input

placeholder="Nama"

value={nama}

onChange={(e)=>

setNama(
e.target.value
)

}

/>



<input

placeholder="Kategori"

value={kategori}

onChange={(e)=>

setKategori(
e.target.value
)

}

/>



<input

type="number"

placeholder="Jumlah"

value={
jumlah || ""
}

onChange={(e)=>

setJumlah(
Number(
e.target.value
)
)

}

/>



<button
onClick={
tambah
}
>

Tambah

</button>


<hr />


<input

placeholder="Cari kategori"

onChange={(e)=>

setSearch(
e.target.value
)

}

/>



<div className="sort">

<button
onClick={
sortAsc
}
>

Ascending ↑

</button>


<button
onClick={
sortDesc
}
>

Descending ↓

</button>

</div>



{

daftar

.filter(

(item)=>

item.kategori

.toLowerCase()

.includes(

search
.toLowerCase()

)

)

.map(

(item,i)=>(

<div
className="item"
key={i}
>

<div>

<b>
{
item.nama
}
</b>

<p>
{
item.kategori
}
</p>

<p>

Rp

{

formatRupiah(
item.jumlah
)

}

</p>

</div>



<button

className="hapus"

onClick={()=>

hapus(i)

}

>

Hapus

</button>


</div>

)

)

}



<hr />


<h2>
Laporan
</h2>


<p>

Total:

Rp

{

formatRupiah(
total
)

}

</p>



<p>

Sisa:

Rp

{

formatRupiah(

budget -
total

)

}

</p>

</>

)

}

</div>

</div>

);

}

export default App;