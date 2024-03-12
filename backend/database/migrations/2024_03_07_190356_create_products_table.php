<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 45);
            $table->string('description', 255);
            $table->unsignedBigInteger('category_id'); // Cambiado a category_id para referenciar el ID
            $table->string('image', 255);
            $table->string('size', 2);
            $table->string('color', 45);
            $table->string('material', 45);
            $table->decimal('price', 5, 2);
            $table->integer('stock')->nullable();
            $table->foreign('category_id')->references('id')->on('categories'); // Corrección aquí
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
