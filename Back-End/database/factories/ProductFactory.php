<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;
use App\Models\SubCategory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word, // Menghasilkan nama produk acak
            'description' => $this->faker->sentence, // Menghasilkan deskripsi singkat untuk produk
            'price' => $this->faker->randomFloat(2, 1, 100), // Menghasilkan harga produk antara 1 dan 100 dengan 2 angka desimal
            'stock' => $this->faker->numberBetween(1, 100), // Menghasilkan jumlah stok produk antara 1 dan 100
            'category_id' => Category::factory(), // Menghasilkan ID kategori dari CategoryFactory
            'sub_category_id' => SubCategory::factory(), // Menghasilkan ID subkategori dari SubCategoryFactory
            'image' => $this->faker->imageUrl(640, 480, 'products', true), // Menghasilkan URL gambar acak
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
