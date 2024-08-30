<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Jalankan seeder untuk mengisi tabel admins
        $this->call(AdminSeeder::class);

        // Jalankan seeder untuk mengisi tabel categories, sub_categories, dan products
        \App\Models\Category::factory(5)->create()->each(function ($category) {
            $category->subCategories()->createMany(
                \App\Models\SubCategory::factory(3)->make()->toArray()
            )->each(function ($subCategory) {
                \App\Models\Product::factory(10)->create([
                    'category_id' => $subCategory->category_id,
                    'sub_category_id' => $subCategory->id,
                ]);
            });
        });
    }
}
